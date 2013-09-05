var redis = require('redis'),
    client = redis.createClient(),
    fromCache = require('../lib/from_cache')(client),
    fromFile = require('../lib/from_file'),
    renderPreview = require('../lib/render_preview');

module.exports = function frameRoute (imagePath) {
  return function (req, res) {
    var file = req.param('file');
    fromCache(imagePath + file, renderPreview(res), fromFile);
  };
};
