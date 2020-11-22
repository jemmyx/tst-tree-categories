const { categories } = require("./data");
const { GraphCat } = require("./graph");

const readline = require("readline");
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
 \nEntrez le numéro de fonction souhaité. `,
    (c) => {
      if (c === "1") {
        rl.question("Label de la catégorie ?", (l) => {
          rl.question("#ID du noeud du parent ?", (p) => {
            const label = p.trim() === "" ? "rootCategory" : p;
            const nodeSelected = GraphCat.findNodeByIdInTree(label, categories);
            if (nodeSelected && nodeSelected.label) {
              const categoriesUpdated = GraphCat.syncCategoriesTreeWithNodeUpdatedHandler(
                l,
                nodeSelected,
                categories
              );
              GraphCat.loopAndDisplayNodeLabel(categoriesUpdated)(0);
              askQuestions(categoriesUpdated);
            }
            console.log(`Node '${p}' not found`);
            askQuestions(categories);
          });
        });
        return;
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
