var express = require("express");
var logfmt = require("logfmt");
var PW = require('png-word');
var pngword = PW(PW.GRAY);
var request = require('request');

var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/:clip/count.png', function(req, res) {
  request('https://dataclips.heroku.com/'+req.param('clip')+'.json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      console.log(data.values.length);
      pngword.createPNG(data.values.length, function(pngnum) {
        res.set('Content-Type', 'image/png');
        res.send(pngnum);
      });
    } else {
      console.log(response.statusCode);
      console.log(error);
      pngword.createPNG('err', function(pngnum) {
        res.set('Content-Type', 'image/png');
        res.send(pngnum);
      });
    }
  })
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
