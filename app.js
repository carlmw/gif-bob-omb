var express = require('express'),
    config = require('./config.json'),
    hogan = require('hogan-express'),
    imagePath = require('path').join(__dirname, config.originals);

module.exports = express()
  .set('view engine', 'html')
  .engine('html', hogan)
  .use(express.static(__dirname + '/public'))
  .get('/frame/:file', require('./routes/frame')(imagePath))
  .get('/', require('./routes/index')(imagePath, config.targetHost))
  .get('/manifest.appcache', require('./routes/manifest')(imagePath))
  .listen(config.port);
