module.exports = renderPreview;

function renderPreview(res) {
  return function (imageData) {
    res.type('png');
    res.set('Cache-Control', 'public, max-age=290304000');
    res.end(imageData, 'binary');
  };
}
