var renderFileList = require('../lib/render_file_list'),
    imageList = require('../lib/image_list');

module.exports = function indexRoute (imagePath, targetHost) {
  return function (req, res) {
    imageList(imagePath, renderFileList(res, targetHost));
  };
};
