var fs = require('fs'),
    queue = require('queue-async'),
    im = require('gm').subClass({ imageMagick: true });
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
  im(file + '[0]')
    .resize(96, 96)
    .quality(30)
    .toBuffer(function (err, buffer) {
      if (err) {
        callback('');
        return;
      }
      callback(buffer);
    });
}
