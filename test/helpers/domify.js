var jsdom = require('jsdom').jsdom,
    env = {};

module.exports = function domify (html, cb) {
  beforeEach(function () {
    env.document = jsdom('<html>' + html + '</html>');
    env.window = env.document.parentWindow;
    env.subject = env.document.firstChild;
    env.$ = byId;
  });

  afterEach(function () {
    env.window.close();
  });

  function byId (id) {
    return env.document.getElementById(id);
  }

  return env;
};
