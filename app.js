var express = require('express'),
    config = require('./config.json'),
    hogan = require('hogan-express'),
    imagemagick = require('imagemagick'),
    redis = require('redis'),
    client = redis.createClient(),
    fs = require('fs'),
    imagePath = __dirname + config.originals + '/',
    fromCache = require('./lib/from_cache')(client),
    fromFile = require('./lib/from_file'),
    imageList = require('./lib/image_list'),
    renderFileList = require('./lib/render_file_list'),
    renderPreview = require('./lib/render_preview');

module.exports = express()
  .set('view engine', 'html')
  .engine('html', hogan)
  .use(express.static(__dirname + '/public'))
  .get('/frame/:file', function (req, res) {
    var file = req.param('file');
    fromCache(imagePath + file, renderPreview(res), fromFile);
  })
  .get('/', function (req, res) {
    imageList(imagePath, renderFileList(res, config.targetHost));
  })
  .listen(config.port);
