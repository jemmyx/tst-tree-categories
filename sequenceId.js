function* sequenceId(i) {
  yield i;
  yield i + 1;
}

module.exports = { sequenceId };
