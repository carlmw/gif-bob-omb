var Emitter = require('emitter-component'),
    domify = require('./helpers/domify'),
    mock = require('./helpers/mock');

function DOMImageIndex () {}
DOMImageIndex.prototype.search = function () {};

describe('ImageResultsView', function () {
  var util = {},
      ImageResultsView,
      env = domify([
        '<ul id="results">',
          '<li id="sadness"><img src="sadness.gif" /></li>',
          '<li id="win"><img src="win.gif" /></li>',
        '</ul>'
      ].join(''));

  mock('./util', util);
  mock('./dom_image_index', DOMImageIndex);

  beforeEach(function () {
    util.dispatcher = new Emitter();
    ImageResultsView = require('../lib/image_results_view');
  });

  describe("when a search is triggered", function () {
    it("queries the index", function () {
      var indexMock = sinon.mock(DOMImageIndex.prototype);
      indexMock.expects('search').withArgs('sad').returns([]);

      new ImageResultsView(env.subject);
      util.dispatcher.emit('search', 'sad');

      indexMock.verify();
    });

    it("only shows matching results", function () {
      sinon.stub(DOMImageIndex.prototype, 'search').returns([env.$('sadness').querySelector('img')]);

      new ImageResultsView(env.subject);
      util.dispatcher.emit('search', 'sad');

      expect(env.$('sadness').style.display).to.equal('');
      expect(env.$('win').style.display).to.equal('none');
    });
  });
});
