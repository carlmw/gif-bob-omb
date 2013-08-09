var sinonLib = require('sinon'),
    expect = require('chai').expect,
    mockery = require('mockery');

beforeEach(function() {
  global.sinon = sinonLib.sandbox.create();
});

afterEach(function(){
  global.sinon.restore();
});

before(function () {
  global.expect = expect;
  mockery.enable();
  mockery.warnOnUnregistered(false);
});

after(function () {
  mockery.deregisterAll();
});
