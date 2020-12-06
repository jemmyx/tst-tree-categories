const { categories } = require("./assets/data");
const { GraphNode } = require("./modules/graph");

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
  4) Lister tous les Ids de noeud.
 \nEntrez le numéro de fonction souhaité. `,
    (c) => {
      if (c === "1") {
        rl.question("Label de la catégorie ?", (l) => {
          rl.question("#ID du noeud du parent ?", (id = null) => {
            if (!categories) {
              // noeud root
              const newNode = { id: 0, label: l };
              GraphNode.loopAndDisplayNodeLabel(newNode)(0);
              askQuestions(newNode);
              return;
            }
            const nodeSelected = GraphNode.findNodeByIdInTree(id, categories);
            if (nodeSelected && nodeSelected.label) {
              const categoriesUpdated = GraphNode.syncCategoriesTreeWithNodeUpdatedHandler(
                l,
                nodeSelected,
                categories
              );
              GraphNode.loopAndDisplayNodeLabel(categoriesUpdated)(0);
              askQuestions(categoriesUpdated);
            } else {
              console.log(`Node '${id}' not found`);
              GraphNode.loopAndDisplayNodeLabel(categories)(0);
              askQuestions(categories);
            }
          });
        });
        return;
      } else if (c === "3") {
        rl.question("#ID du noeud à modifier ?", (id) => {
          rl.question("Nouveau label ?", (newLabel) => {
            const nodeSelected = GraphNode.findNodeByIdInTree(id, categories);
            if (nodeSelected && nodeSelected.label) {
              const nodeUpdated = { ...nodeSelected, label: newLabel };
              let cloneCategories = JSON.parse(JSON.stringify(categories));
              GraphNode.updateCategoriesTreeWithNewNode(
                nodeUpdated,
                cloneCategories
              );
              GraphNode.loopAndDisplayNodeLabel(cloneCategories)(0);
            } else {
              console.log(`Node with id ${id} not found`);
            }
            askQuestions(categories);
          });
        });
      } else if (c === "4") {
        // tous les IDs
        const addId = (ids = [], node) => {
          ids.push(node.id);
          if (node.children) {
            node.children.map((n) => addId(ids, n));
          }
          return ids;
        };
        console.log(addId([], categories));
      }

      rl.question("ID du noeud à supprimer ?", (id) => {
        const graphParsed = GraphNode.searchAndDeleteNodeGraph(categories, id);
        GraphNode.loopAndDisplayNodeLabel(graphParsed)(0);
        askQuestions(graphParsed);
      });
    }
  );
};

GraphNode.loopAndDisplayNodeLabel(categories)(0);
askQuestions(categories);
