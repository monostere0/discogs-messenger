// This module exists solely because Math.random can't be directly stubbed in Babel
// https://github.com/babel/babel/issues/5426
module.exports = {
  random(...args) {
    return Math.random(...args);
  },
  round(...args) {
    return Math.round(...args);
  },
};
