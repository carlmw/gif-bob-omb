var renderFileList = require('../lib/render_file_list');

describe('renderFileList', function () {
  var response = { render: function () {} };

  it("renders", function () {
    responseMock = sinon.mock(response);
    responseMock.expects('render')
      .withArgs('index', { files: ['herp.gif'], host: 'http://roflcopter.com' });

    renderFileList(response, 'http://roflcopter.com')(['herp.gif']);

    responseMock.verify();
  });
});
