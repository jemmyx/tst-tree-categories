const cloneDeep = (obj = {}) => {
  return JSON.parse(JSON.stringify(obj));
};

module.exports = cloneDeep;
