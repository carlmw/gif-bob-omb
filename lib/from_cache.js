module.exports = fromCache;

function fromCache (client) {
  return function (file, callback, fallback) {
    client.get(file, function (err, imageData) {
      if (imageData) {
        callback(imageData);
      } else {
        fallback(file, cacheAndCallback);
      }
    });

    function cacheAndCallback(imageData) {
      callback(imageData);
      toCache(file, imageData);
    }
  };

  function toCache(file, imageData) {
    client.set(file, imageData);
  }
}
