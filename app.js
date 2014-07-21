var express = require("express");
var logfmt = require("logfmt");
var PW = require('png-word');
var pngword = PW(PW.GRAY);

var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/:clip/count.png', function(req, res) {
  pngword.createPNG('abcd', function(pngnum) {
    res.set('Content-Type', 'image/png');
    res.send(pngnum);
  });
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
