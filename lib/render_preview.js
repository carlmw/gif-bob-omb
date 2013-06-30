module.exports = renderPreview;

function renderPreview(res) {
  return function (imageData) {
    res.type('png');
    res.end(imageData, 'binary');
  };
}
