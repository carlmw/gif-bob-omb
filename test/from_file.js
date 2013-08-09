var fs = require('fs'),
    mockery = require('mockery'),
    imagemagick = require('imagemagick'),
    queue = require('queue-async'),
    fromFile,
    queueInst = {
      defer: function (fn) { fn(function () {}); }
    },
    queue = function () { return queueInst; };

describe('fromFile', function () {
  before(function () {
    mockery.registerMock('queue-async', queue);
    fromFile = require('../lib/from_file');
  });

  it("reads the file", function () {
    sinon.stub(imagemagick, 'resize');
    var fsMock = sinon.mock(fs)
      .expects('readFile')
      .withArgs('notsureifserious.gif');

    fromFile('notsureifserious.gif', function () {});

    fsMock.verify();
  });

  describe("when the file is read successfully", function () {
    it("resizes the file", function () {
      sinon.stub(fs, 'readFile').callsArgWith(1, null, 'imageData');

      var imagemagickMock = sinon.mock(imagemagick);
      imagemagickMock.expects('resize')
        .withArgs({ srcData: 'imageData', height: 100, format: 'jpg', quality: 0.5 });

      fromFile('notsureifserious.gif', function () {});

      imagemagickMock.verify();
    });

    it("calls the callback with the image data", function () {
      var Buffer = sinon.stub(global, 'Buffer'),
          callbackMock = sinon.mock();
      Buffer.prototype = { blobby: 'blob' };
      callbackMock.withArgs(Buffer.prototype);
      sinon.stub(fs, 'readFile').callsArgWith(1, null, 'imageData');
      sinon.stub(imagemagick, 'resize').callsArgWith(1, '', 'blob');

      fromFile('notsureifserious.gif', callbackMock);

      callbackMock.verify();
    });

    it("calls next", function () {
      var nextMock = sinon.mock();
      sinon.stub(queueInst, 'defer').callsArgWith(0, nextMock);
      sinon.stub(fs, 'readFile').callsArg(1, null, 'imageData');
      sinon.stub(imagemagick, 'resize').callsArgWith(1, '', 'blob');

      fromFile('notsureifserious.gif', function () {});

      nextMock.verify();
    });
  });

  describe("when the file read is unsuccessful", function () {
    it("calls the callback", function () {
      var callbackMock = sinon.mock();
      callbackMock.withArgs('');
      sinon.stub(fs, 'readFile').callsArgWith(1, 'whoops');
      sinon.stub(imagemagick, 'resize');

      fromFile('notsureifserious.gif', callbackMock);

      callbackMock.verify();
    });

    it("calls next", function () {
      var nextMock = sinon.mock();
      sinon.stub(queueInst, 'defer').callsArgWith(0, nextMock);
      sinon.stub(fs, 'readFile').callsArgWith(1, 'whoops');
      sinon.stub(imagemagick, 'resize');

      fromFile('notsureifserious.gif', function () {});

      nextMock.verify();
    });

    it("doesn't try to resize the image", function () {
      sinon.stub(imagemagick, 'resize');
      sinon.stub(fs, 'readFile').callsArgWith(1, 'whoops');

      fromFile('notsureifserious.gif', function () {});

      expect(imagemagick.resize.called).to.equal(false);
    });
  });
});
