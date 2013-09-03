var mockery = require('mockery');

describe('renderManifest', function () {
  var response = { render: function () {}, set: function () {} },
      renderManifest;

  before(function () {
    mockery.registerSubstitute('../config.json', '../test/acceptance/config.json');
    renderManifest = require('../lib/render_manifest');
  });

  it("renders", function () {
    responseMock = sinon.mock(response);
    responseMock.expects('render')
      .withArgs('manifest', {
        files: ['derp.gif'],
        version: '3c193e74056a32011598d043e66891428c98ef3a',
        host: 'http://aws.com/gifbobomb/'
      });

    renderManifest(response)(['derp.gif']);

    responseMock.verify();
  });

  it("sets the content type", function () {
    responseMock = sinon.mock(response);
    responseMock.expects('set')
      .withArgs('Content-Type', 'text/cache-manifest');

    renderManifest(response)('manifest', { files: ['derp.gif'] });

    responseMock.verify();
  });
});
