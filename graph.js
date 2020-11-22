const GraphCat = {
  loopAndDisplayNodeLabel: (node) => (level) => {
    const indent = Array.from({ length: level + 1 }, (_, val) => " ");
    console.log(`${indent.join(" ")} l${level}: ${node.label} #${node.id}`);
    if (node.children && Array.isArray(node.children)) {
      level += 1;
      node.children.map((n) => GraphCat.loopAndDisplayNodeLabel(n)(level));
    }
  },
  findNodeByIdInTree: (id, node) => {
    if (node.id === parseInt(id, 10)) {
      return node;
    }
    let foundNode = null;
    if (node.children && Array.isArray(node.children)) {
      for (let i = 0; i < node.children.length; i++) {
        foundNode = GraphCat.findNodeByIdInTree(id, node.children[i]);
        if (foundNode) {
          break;
        }
      }
      return foundNode;
    }
    return null;
  },
  findNodeByLabelInTree: (label, node) => {
    if (node.label === label) {
      return node;
    }
    let foundNode = null;
    if (node.children && Array.isArray(node.children)) {
      for (let i = 0; i < node.children.length; i++) {
        foundNode = GraphCat.findNodeByLabelInTree(label, node.children[i]);
        if (foundNode) {
          break;
        }
      }
      return foundNode;
    }
    return null;
  },
  updateCategoriesTreeWithNewNode: (nodeUpdated, iterateNode) => {
    if (iterateNode.label === nodeUpdated.label) {
      Object.assign(iterateNode, nodeUpdated);
      return;
    }

    if (iterateNode.children && Array.isArray(iterateNode.children)) {
      iterateNode.children.map((n) =>
        GraphCat.updateCategoriesTreeWithNewNode(nodeUpdated, n)
      );
    }
  },
  syncCategoriesTreeWithNodeUpdatedHandler: (
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
    GraphCat.updateCategoriesTreeWithNewNode(nodeUpdated, cloneCategories);
    return cloneCategories;
  }
};

module.exports = { GraphCat };
