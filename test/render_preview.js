var renderPreview = require('../lib/render_preview');

describe('renderPreview', function () {
  var response = { type: function () {}, end: function () {}, set: function () {} };

  it("sets the content type", function () {
    var responseMock = sinon.mock(response);
    responseMock.expects('type').withArgs('png');

    renderPreview(response)();

    responseMock.verify();
  });

  it("sends the image data", function () {
    var responseMock = sinon.mock(response);
    responseMock.expects('end').withArgs('blob', 'binary');

    renderPreview(response)('blob');

    responseMock.verify();
  });

  it("sends a cache header", function () {
    var responseMock = sinon.mock(response);
    responseMock.expects('set').withArgs('Cache-Control', 'public, max-age=290304000');

    renderPreview(response)();

    responseMock.verify();
  });
});
