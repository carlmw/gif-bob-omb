var renderManifest = require('../lib/render_manifest'),
    imageList = require('../lib/image_list');

module.exports = function manifestRoute (imagePath) {
  return function (req, res) {
    imageList(imagePath, renderManifest(res));
  };
};
