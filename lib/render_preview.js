module.exports = renderPreview;

function renderPreview(res) {
  return function (url) {
    res.redirect(301, url);
  };
}
