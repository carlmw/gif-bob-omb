var fs = require('fs'),
    imagemagick = require('imagemagick');

module.exports = fromFile;

function fromFile (file, callback) {
  var opts = {
    srcData: fs.readFileSync(file),
    height: 100,
    format: 'png'
  };
  imagemagick.resize(opts, function (err, blob) {
    callback(blob);
  });
}
