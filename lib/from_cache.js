var aws = require('aws-sdk'),
    config = require('../config.json'),
    fileRe = /[^\/]*$/;

module.exports = fromCache;

function fromCache (client) {
  aws.config.update(config.s3);
  var s3 = new aws.S3({ params: { Bucket: config.bucket } });
  s3.createBucket();

  return function (file, callback, fallback) {
    var key = file.match(fileRe)[0];

    client.get(key, function (err, url) {
      if (url) {
        callback(url);
      } else {
        fallback(file, cacheAndCallback);
      }
    });

    function cacheAndCallback(imageData) {
      toCache(key, imageData, callback);
    }
  };

  function toCache(key, imageData, callback) {
    var url = config.assetHost + config.bucket + '/' + key,
        params = {
          Body: imageData,
          Key: key,
          ACL: 'public-read',
          CacheControl: 'public, max-age=290304000',
          ContentType: 'image/jpg'
        };

    s3.putObject(params, function (err) {
      callback(url);
      if (err) return;
      client.set(key, url);
    });
  }
}
