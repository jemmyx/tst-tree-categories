const categories = {
  id: 0,
  label: "rootCategory",
  children: [
    {
      id: 1,
      label: "Applications",
      children: [
        {
          id: 2,
          label: "Calendar"
        },
        {
          id: 3,
          label: "Chrome"
        },
        {
          id: 4,
          label: "Webstorm"
        }
      ]
    },
    {
      id: 5,
      label: "Documents",
      children: [
        {
          id: 10,
          label: "OSS"
        },
        {
          id: 6,
          label: "Material-UI",
          children: [
            {
              id: 7,
              label: "src",
              children: [
                {
                  id: 8,
                  label: "index.js"
                },
                {
                  id: 9,
                  label: "tree-view.js"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

module.exports = { categories };
