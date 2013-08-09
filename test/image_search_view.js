var Emitter = require('emitter-component'),
    mock = require('./helpers/mock'),
    domify = require('./helpers/domify'),
    util = { dispatcher: new Emitter() };

function DOMImageIndex () {}
DOMImageIndex.prototype.search = function () {};

describe('ImageSearchView', function () {
  var env = domify('<input type="search" />'),
      ImageSearchView;

  mock('./util', util);
  mock('./dom_image_index', DOMImageIndex);

  before(function () {
    ImageSearchView = require('../lib/image_search_view');
  });

  describe("when a search is entered", function () {
    it("emits the search event", function () {
      var view = new ImageSearchView(env.subject),
          searchMock = sinon.mock(),
          results = sinon.stub();

      searchMock.withArgs('sad');

      util.dispatcher.on('search', searchMock);

      var evt = new env.document.createEvent('Event');
      env.subject.value = 'sad';
      evt.initEvent('keyup', true, true);
      env.subject.dispatchEvent(evt);

      searchMock.verify();
    });
  });
});
