var mockery = require('mockery');

describe('fromCache', function () {
  var client = { get: function () {}, set: function () {} },
      fromCache,
      aws = require('aws-sdk');

  before(function () {
    mockery.registerMock('../config.json', {
      assetHost: 'http://aws.com/',
      bucket: 'gifs',
      s3: { accessKeyId: 'akid', secretAccessKey: 'secret', region: 'eu-west-1' }
    });
    fromCache = require('../lib/from_cache');
  });

  after(function () {
    mockery.deregisterAll();
  });

  beforeEach(function () {
    sinon.stub(aws.config, 'update');
    var S3 = sinon.stub(aws, 'S3');
    S3.prototype = {
      createBucket: function () {},
      putObject: function () {}
    };
  });

  it("configures aws", function () {
    aws.config.update.restore();
    var configMock = sinon.mock(aws.config);
    configMock.expects('update').withArgs({ accessKeyId: 'akid', secretAccessKey: 'secret', region: 'eu-west-1' });

    fromCache(client);

    configMock.verify();
  });

  it("creates the bucket", function () {
    aws.S3.restore();
    var createMock = sinon.mock();
    sinon.stub(aws, 'S3').withArgs({ params: { Bucket: 'gifs' } }).returns({
      createBucket: createMock
    });

    fromCache(client);

    createMock.verify();
  });

  it("reads from the client", function () {
    var clientMock = sinon.mock(client);
    clientMock.expects('get').withArgs('roflcopter.gif');

    fromCache(client)('roflcopter.gif', function () {});

    clientMock.verify();
  });

  describe("when the file is in the cache", function () {
    beforeEach(function () {
      subject = fromCache(client);
    });

    it("calls the callback with the blob", function () {
      var callback = sinon.mock();
      callback.withArgs('blob');
      sinon.stub(client, 'get').callsArgWith(1, null, 'blob');

      subject('roflcopter.gif', callback);

      callback.verify();
    });
  });

  describe("when the file is not in the cache", function () {
    beforeEach(function () {
      subject = fromCache(client);
    });

    it("calls the fallback with the file name", function () {
      var fallback = sinon.mock(),
          callback = sinon.stub();
      fallback.withArgs('roflcopter.gif');
      sinon.stub(client, 'get').callsArgWith(1, null, null);

      subject('roflcopter.gif', callback, fallback);

      fallback.verify();
    });

    describe("and when the fallback has been called", function () {
      var fallback;
      beforeEach(function () {
        fallback = sinon.stub().callsArgWith(1, 'blob');
        sinon.stub(client, 'get').callsArgWith(1, null, null);
      });

      it("stores the file", function () {
        var s3Mock = sinon.mock(aws.S3.prototype);
        s3Mock.expects('putObject').withArgs({
          Body: 'blob',
          Key: 'roflcopter.gif',
          ACL: 'public-read',
          CacheControl: 'public, max-age=290304000',
          ContentType: 'image/jpg'
        });

        subject('roflcopter.gif', function () {}, fallback);

        s3Mock.verify();
      });

      describe("and when the file has been stored", function () {
        beforeEach(function () {
          sinon.stub(aws.S3.prototype, 'putObject').callsArg(1);
        });

        it("calls the callback with the url", function () {
          var callbackMock = sinon.mock();
          callbackMock.withArgs('http://aws.com/gifs/roflcopter.gif');

          subject('roflcopter.gif', callbackMock, fallback);

          callbackMock.verify();
        });

        it("caches the result", function () {
          var clientMock = sinon.mock(client);
          clientMock.expects('set').withArgs('roflcopter.gif', 'http://aws.com/gifs/roflcopter.gif');

          subject('roflcopter.gif', function () {}, fallback);

          clientMock.verify();
        });
      });
    });
  });
});
