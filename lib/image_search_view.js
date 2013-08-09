var util = require('./util');

module.exports = function (el) {
  el.addEventListener('keyup', handleKeyUp);
};

function handleKeyUp () {
  util.dispatcher.emit('search', this.value);
}
