var mock = require('./helpers/mock'),
    sadface = { src: 'path/sadface.gif' },
    winsauce = { src: 'path/winsauce.gif' },
    util = {
      global: {
        document: {
          querySelectorAll: function () {
            return [sadface, winsauce];
          }
        }
      }
    };

describe('DOMImageIndex', function () {
  var DOMImageIndex;

  mock('./util', util);

  before(function () {
    DOMImageIndex = require('../lib/dom_image_index');
  });

  describe("when a query is made", function () {
    it("returns nodes where the query matches the start of the file name", function () {
      var index = new DOMImageIndex([winsauce, sadface]),
          result = index.search('sad');

      expect(result).to.contain(sadface);
      expect(result).not.to.contain(winsauce);
    });
  });
});
