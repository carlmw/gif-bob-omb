var fromCache = require('../lib/from_cache');

describe('fromCache', function () {
  var client = { get: function () {}, set: function () {} },
      subject = fromCache(client);

  it("reads from the client", function () {
    var clientMock = sinon.mock(client);
    clientMock.expects('get').withArgs('roflcopter.gif');
    subject('roflcopter.gif', function () {});
  });

  describe("when the file is in the cache", function () {
    it("calls the callback with the blob", function () {
      var callback = sinon.mock();
      callback.withArgs('blob');
      sinon.stub(client, 'get').callsArgWith(1, null, 'blob');

      subject('roflcopter.gif', callback);

      callback.verify();
    });
  });

  describe("when the file is not in the cache", function () {
    it("calls the fallback with the file name and callback", function () {
      var fallback = sinon.mock(),
          callback = sinon.stub();
      fallback.withArgs('roflcopter.gif', callback);
      sinon.stub(client, 'get').callsArgWith(1, null, null);

      subject('roflcopter.gif', callback, fallback);

      fallback.verify();
    });
  });
});
