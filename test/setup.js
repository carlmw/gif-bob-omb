var sinonLib = require('sinon');

beforeEach(function() {
  global.sinon = sinonLib.sandbox.create();
});

afterEach(function(){
  global.sinon.restore();
});
