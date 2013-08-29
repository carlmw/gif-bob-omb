var crypto = require('crypto');

module.exports = function renderManifest(res) {
  return function (files) {
    var hash = crypto.createHash('sha1');
    hash.update(files.toString());
    res.set('Content-Type', 'text/cache-manifest');
    res.render('manifest', { files: files, version: hash.digest('hex') });
  };
};
