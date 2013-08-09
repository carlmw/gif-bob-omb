var Emitter = require('emitter-component');

module.exports = {
  global: global || window,
  dispatcher: new Emitter()
};
