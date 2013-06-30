var request = require('supertest'),
    mockery = require('mockery'),
    redis = require("redis"),
    client = redis.createClient(),
    app;

describe('acceptance', function () {
  before(function () {
    mockery.enable();
    mockery.warnOnUnregistered(false);
    mockery.registerSubstitute('./config.json', './test/acceptance/config.json');
    app = require('../../app');
  });

  after(function () {
    mockery.deregisterAll();
    mockery.disable();
  });

  describe('GET /', function(){
    it('should serve a file list', function(done){
      request(app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('GET /frame/:file', function () {
    after(function (done) {
      client.del(__dirname + '/fixtures/hireme.png', done);
    });

    it('should serve a file', function (done) {
      request(app)
        .get('/frame/hireme.png')
        .expect(200)
        .expect('Content-Type', 'image/png', done);
    });
  });
});
