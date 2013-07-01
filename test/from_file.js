var fs = require('fs'),
    mockery = require('mockery'),
    imagemagick = require('imagemagick'),
    queue = require('queue-async'),
    fromFile;

describe('fromFile', function () {
  var queueInst = { defer: function () {} },
      queue = function () { return queueInst; };
  before(function () {
    mockery.enable();
    mockery.warnOnUnregistered(false);
    mockery.registerMock('queue-async', queue);
    fromFile = require('../lib/from_file');
    sinon.stub(queueInst, 'defer').callsArgWith(0, function () {});
  });

  it("reads the file", function () {
    sinon.stub(imagemagick, 'resize');
    var fsMock = sinon.mock(fs)
      .expects('readFileSync')
      .withArgs('notsureifserious.gif');

    fromFile('notsureifserious.gif', function () {});

    fsMock.verify();
  });

  it("resizes the file", function () {
    sinon.stub(fs, 'readFileSync')
      .returns('fileRef');
    var imagemagickMock = sinon.mock(imagemagick);
    imagemagickMock.expects('resize')
      .withArgs({ srcData: 'fileRef', height: 100, format: 'png' });

    fromFile('notsureifserious.gif', function () {});

    imagemagickMock.verify();
  });

  it("calls the callback with the image data", function () {
    var callbackMock = sinon.mock();
    callbackMock.withArgs('blob');
    sinon.stub(fs, 'readFileSync');
    sinon.stub(imagemagick, 'resize').callsArgWith(1, '', 'blob');

    fromFile('notsureifserious.gif', callbackMock);

    callbackMock.verify();
  });

  it("calls next", function () {
    var nextMock = sinon.mock();
    queueInst.defer.callsArgWith(0, nextMock);
    sinon.stub(fs, 'readFileSync');
    sinon.stub(imagemagick, 'resize').callsArgWith(1, '', 'blob');

    fromFile('notsureifserious.gif', function () {});

    nextMock.verify();
  });
});
