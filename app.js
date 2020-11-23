const { categories } = require("./assets/data");
const { GraphCat } = require("./modules/graph");

const readline = require("readline");
const { Console } = require("console");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("close", function () {
  console.log("\nBYE BYE");
  process.exit(0);
});

const askQuestions = (categories) => {
  rl.question(
    `
  Menu
  ----------------------
  1) Ajouter un noeud.
  2) Supprimer un noeud.
  3) Modifier un noeud.
 \nEntrez le numéro de fonction souhaité. `,
    (c) => {
      if (c === "1") {
        rl.question("Label de la catégorie ?", (l) => {
          rl.question("#ID du noeud du parent ?", (id = null) => {
            if (!categories) {
              // noeud root
              const newNode = { id: 0, label: l };
              GraphCat.loopAndDisplayNodeLabel(newNode)(0);
              askQuestions(newNode);
              return;
            }
            const nodeSelected = GraphCat.findNodeByIdInTree(id, categories);
            if (nodeSelected && nodeSelected.label) {
              const categoriesUpdated = GraphCat.syncCategoriesTreeWithNodeUpdatedHandler(
                l,
                nodeSelected,
                categories
              );
              GraphCat.loopAndDisplayNodeLabel(categoriesUpdated)(0);
              askQuestions(categoriesUpdated);
            } else {
              console.log(`Node '${id}' not found`);
              GraphCat.loopAndDisplayNodeLabel(categories)(0);
              askQuestions(categories);
            }
          });
        });
        return;
      } else if (c === "3") {
        rl.question("#ID du noeud à modifier ?", (id) => {
          rl.question("Nouveau label ?", (newLabel) => {
            const nodeSelected = GraphCat.findNodeByIdInTree(id, categories);
            if (nodeSelected && nodeSelected.label) {
              const nodeUpdated = { ...nodeSelected, label: newLabel };
              let cloneCategories = JSON.parse(JSON.stringify(categories));
              GraphCat.updateCategoriesTreeWithNewNode(
                nodeUpdated,
                cloneCategories
              );
              GraphCat.loopAndDisplayNodeLabel(cloneCategories)(0);
            } else {
              console.log(`Node with id ${id} not found`);
            }
            askQuestions(categories);
          });
        });
      }

      rl.question("ID du noeud à supprimer ?", (id) => {
        const graphParsed = GraphCat.searchAndDeleteNodeGraph(categories, id);
        GraphCat.loopAndDisplayNodeLabel(graphParsed)(0);
        askQuestions(graphParsed);
      });
    }
  );
};

GraphCat.loopAndDisplayNodeLabel(categories)(0);
askQuestions(categories);
