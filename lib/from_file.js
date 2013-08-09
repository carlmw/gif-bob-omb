var fs = require('fs'),
    queue = require('queue-async'),
    imagemagick = require('imagemagick'),
    q = queue(1);

module.exports = fromFile;

function fromFile (file, callback) {
  q.defer(function (next) {
    readAndResize(file, function (data) {
      callback(data);
      next();
    });
  });
}

function readAndResize(file, callback) {
  fs.readFile(file, function (err, data) {
    if (err) {
      callback('');
      return;
    }

    var opts = {
      srcData: data,
      height: 100,
      format: 'jpg',
      quality: 0.5
    };
    imagemagick.resize(opts, function (err, blob) {
      callback(new Buffer(blob, 'binary'));
    });
  });
}
