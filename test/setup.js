var sinonLib = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    sinonChai = require("sinon-chai"),
    mockery = require('mockery');

chai.use(sinonChai);

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
