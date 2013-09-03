var fs = require('fs'),
    mockery = require('mockery'),
    queue = require('queue-async'),
    fromFile,
    queueInst = {
      defer: function (fn) { fn(function () {}); }
    },
    queue = function () { return queueInst; },
    im,
    imApi = {
      resize: function () { return imApi; },
      quality: function () { return imApi; },
      toBuffer: function () {}
    };

describe('fromFile', function () {
  before(function () {
    im = sinon.stub().returns(imApi);
    gm = { subClass: sinon.stub().returns(im) };
    mockery.registerMock('gm', gm);
    mockery.registerMock('queue-async', queue);
    fromFile = require('../lib/from_file');
  });

  beforeEach(function () {
    im.reset();
  });

  it("uses imagemagick", function () {
    expect(gm.subClass).to.have.been
      .calledWith({ imageMagick: true });
  });

  it("reads the ffirst frame", function () {
    fromFile('notsureifserious.gif', function () {});

    expect(im).to.have.been.calledWith('notsureifserious.gif[0]');
  });

  it("crops the image", function () {
    var imMock = sinon.mock(imApi);
    imMock.expects('resize')
      .withArgs(96, 96)
      .returns(imApi);
    fromFile('notsureifserious.gif', function () {});

    imMock.verify();
  });

  it("sets the quality", function () {
    var imMock = sinon.mock(imApi);
    imMock.expects('quality')
      .withArgs(30)
      .returns(imApi);
    fromFile('notsureifserious.gif', function () {});

    imMock.verify();
  });

  describe("when no error occurs", function () {
    it("calls the callback with a buffer", function () {
      sinon.stub(imApi, 'toBuffer').callsArgWith(0, null, 'buffer');
      var callback = sinon.mock();
      callback.withArgs('buffer');
      fromFile('notsureifserious.gif', callback);

      callback.verify();
    });
  });

  describe("when an error occurs", function () {
    it("calls the callback with an empty string", function () {
      sinon.stub(imApi, 'toBuffer').callsArgWith(0, 'balls', null);
      var callback = sinon.mock();
      callback.withArgs('');
      fromFile('notsureifserious.gif', callback);

      callback.verify();
    });
  });

  it("calls next", function () {
    var nextMock = sinon.mock();
    sinon.stub(queueInst, 'defer').callsArgWith(0, nextMock);
    sinon.stub(imApi, 'toBuffer').callsArgWith(0, 'balls', null);
    fromFile('notsureifserious.gif', function () {});

    nextMock.verify();
  });
});
