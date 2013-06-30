var imageList = require('../lib/image_list'),
    fs = require('fs');

describe('imageList', function () {
  it("reads the directory listing", function () {
    var fsMock = sinon.mock(fs);
    fsMock.expects('readdir')
      .withArgs('/image/dir')
      .returns([]);

    imageList('/image/dir', function () {});

    fsMock.verify();
  });

  it("supplies the callback with images only", function () {
    var callbackMock = sinon.mock();
    callbackMock.withArgs([
      'mostinterestingman.jpg',
      'catrunningupslide.gif',
      'wut.gif'
    ]);
    sinon.stub(fs, 'readdir').callsArgWith(1, null, [
      'mostinterestingman.jpg',
      'catrunningupslide.gif',
      'wut.gif',
      '.jpg.gifpng'
    ]);

    imageList('/image/dir', callbackMock);

    callbackMock.verify();
  });
});
