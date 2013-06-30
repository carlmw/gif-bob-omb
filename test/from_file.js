var fs = require('fs'),
    imagemagick = require('imagemagick'),
    fromFile = require('../lib/from_file');

describe('fromFile', function () {
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
});
