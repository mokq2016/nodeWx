var express = require('express');
var app = express();
/*var fileRouter = require('./src/router/fileupload.js')*/
var bodyParser = require('body-parser');

var testRouter = require('./src/router/testRouter.js')
app.use(express.static('dist'))
app.use(express.static('dist2'))
app.use(bodyParser.json())

/*app.use('/upload/', fileRouter);*/
app.use('/test',testRouter)
app.get('/', function(req, res) {
  res.redirect('dist/index.html')
});


var server = app.listen(5050, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
