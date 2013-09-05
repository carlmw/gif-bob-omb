var redis = require('redis'),
    client = redis.createClient(),
    fromCache = require('../lib/from_cache')(client),
    fromFile = require('../lib/from_file'),
    path = require('path'),
    renderPreview = require('../lib/render_preview');

module.exports = function frameRoute (imagePath) {
  return function (req, res) {
    var file = req.param('file'),
        filePath = path.join(imagePath, file);

    fromCache(filePath, renderPreview(res), fromFile);
  };
};
