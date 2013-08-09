var document = require('./util').global.document,
    fileRe = /[^\/]*$/;

module.exports = DOMImageIndex;

function DOMImageIndex (nodes) {
  this.nodeZipper = zipNodes(nodes);
  this.idx = Array.prototype.map.call(nodes, collectFilename);
}

DOMImageIndex.prototype = {
  search: function search (query) {
    return this.idx.reduce(matchQuery(query), []).map(this.nodeZipper);
  }
};

function collectFilename (el) {
  return el.src.match(fileRe)[0];
}

function zipNodes (nodes) {
  return function pickNode (index) {
    return nodes[index];
  };
}

function matchQuery (query) {
  var re = new RegExp('^' + query);

  return function matcher (memo, filename, i) {
    if (filename.match(re)) memo.push(i);
    return memo;
  };
}
