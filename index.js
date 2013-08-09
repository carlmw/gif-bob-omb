var document = require('./lib/util').global.document,
    ImageSearchView = require('./lib/image_search_view'),
    ImageResultsView = require('./lib/image_results_view');

new ImageSearchView(document.querySelector('input'));
new ImageResultsView(document.querySelector('ul'));
