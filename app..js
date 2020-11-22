const { categories } = require("./data");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("close", function () {
  console.log("\nBYE BYE");
  process.exit(0);
});

const loopAndDisplayNodeLabel = (node) => (level) => {
  const indent = Array.from({ length: level + 1 }, (_, val) => " ");
  console.log(`${indent.join(" ")} niveau ${level}: ${node.label}`);
  if (node.children && Array.isArray(node.children)) {
    level += 1;
    node.children.map((n) => loopAndDisplayNodeLabel(n)(level));
  }
};

const findNodeByLabelInTree = (label, node) => {
  if (node.label === label) {
    return node;
  }
  let foundNode = null;
  if (node.children && Array.isArray(node.children)) {
    for (let i = 0; i < node.children.length; i++) {
      foundNode = findNodeByLabelInTree(label, node.children[i]);
      if (foundNode) {
        break;
      }
    }
    return foundNode;
  }
  return null;
};

const updateCategoriesTreeWithNewNode = (nodeUpdated, iterateNode) => {
  if (iterateNode.label === nodeUpdated.label) {
    Object.assign(iterateNode, nodeUpdated);
    return;
  }

  if (iterateNode.children && Array.isArray(iterateNode.children)) {
    iterateNode.children.map((n) =>
      updateCategoriesTreeWithNewNode(nodeUpdated, n)
    );
  }
};

const syncCategoriesTreeWithNodeUpdatedHandler = (
  categoryName,
  nodeSelected,
  categories
) => {
  //update the node
  const children = nodeSelected.children || [];
  const nodeUpdated = {
    ...nodeSelected,
    children: [...children, { id: 999, label: categoryName }]
  };
  //update tree with new node
  let cloneCategories = JSON.parse(JSON.stringify(categories));
  updateCategoriesTreeWithNewNode(nodeUpdated, cloneCategories);
  return cloneCategories;
};

const askQuestions = (categories) => {
  rl.question(
    `
  Menu
  ----------------------
  1) Ajouter un noeud.
  3) Supprimer un noeud.
 \nEntrez le numéro de fonction souhaité. `,
    (c) => {
      const choice = c;
      rl.question("Label de la catégorie ?", (l) => {
        if (c === "1") {
          rl.question("Noeud du parent ?", (p) => {
            const label = p.trim() === "" ? "rootCategory" : p;
            const nodeSelected = findNodeByLabelInTree(p, categories);
            if (nodeSelected && nodeSelected.label) {
              const categoriesUpdated = syncCategoriesTreeWithNodeUpdatedHandler(
                l,
                nodeSelected,
                categories
              );
              loopAndDisplayNodeLabel(categoriesUpdated)(0);
              askQuestions(categoriesUpdated);
            }
            console.log(`Node '${p}' not found`);
            askQuestions(categories);
          });
          return;
        }
        console.log("delete to be implemented.");
      });
    }
  );
};

loopAndDisplayNodeLabel(categories)(0);
askQuestions(categories);
