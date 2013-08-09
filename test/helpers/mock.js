var mockery = require('mockery');

module.exports = function mock (path, standIn) {
  before(function () {
    mockery.registerMock(path, standIn);
  });

  after(function () {
    mockery.deregisterMock(path);
  });
};
