var renderPreview = require('../lib/render_preview');

describe('renderPreview', function () {
  var response = { redirect: function () {} };

  it("redirects to the url", function () {
    var responseMock = sinon.mock(response);
    responseMock.expects('redirect').withArgs(301, 'http://image.jpg');
    renderPreview(response)('http://image.jpg');

    responseMock.verify();
  });
});
