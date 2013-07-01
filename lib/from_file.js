var fs = require('fs'),
    queue = require('queue-async'),
    imagemagick = require('imagemagick'),
    q = queue(2);

module.exports = fromFile;

function fromFile (file, callback) {
  var opts = {
    srcData: fs.readFileSync(file),
    height: 100,
    format: 'png'
  };
  q.defer(function (next) {
    imagemagick.resize(opts, function (err, blob) {
      callback(blob);
      next();
    });
  });
}
