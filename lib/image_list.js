var fs = require('fs');

module.exports = imageList;

function imageList(dir, callback) {
  fs.readdir(dir, filterback(callback));
}

function filterback(callback) {
  return function (err, files) {
    var images = files.reduce(reduceImages, []);
    callback(images);
  };
}

function reduceImages(memo, file) {
  if (file.match(/\.(jpg|gif|png)$/)) {
    memo.push(file);
  }
  return memo;
}
