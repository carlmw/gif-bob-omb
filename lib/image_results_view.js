var util = require('./util'),
    DOMImageIndex = require('./dom_image_index');

module.exports = function ImageResultsView (el) {
  var domImages = el.querySelectorAll('img'),
      idx = new DOMImageIndex(domImages);
  util.dispatcher.on('search', searchHandler(domImages, idx));
};

function searchHandler (domImages, idx) {
  return function (query) {
    var results = idx.search(query);
    Array.prototype.forEach.call(domImages, toggle(results));
  };
}

function toggle (results) {
  return function (el) {
    el.parentNode.style.display = results.indexOf(el) == -1 ? 'none' : '';
  };
}
