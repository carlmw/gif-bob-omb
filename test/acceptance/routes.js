var request = require('supertest'),
    mockery = require('mockery'),
    redis = require('redis'),
    client,
    app;

describe('acceptance', function () {
  before(function () {
    mockery.registerSubstitute('./config.json', './test/acceptance/config.json');
    app = require('../../app');
    client = redis.createClient();
    client.set('hireme.png', 'http://aws.com/hireme.png');
  });

  after(function (done) {
    client.del('hireme.png', done);
  });

  describe('GET /', function(){
    it('should serve a file list', function(done){
      request(app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('GET /frame/:file', function () {
    it('should serve a file', function (done) {
      request(app)
        .get('/frame/hireme.png')
        .expect(301)
        .expect('Location', 'http://aws.com/hireme.png', done);
    });
  });
});
