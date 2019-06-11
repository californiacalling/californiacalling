var express = require('express');
var nunjucks = require('nunjucks');
var path = require('path');
var app = express();

function main() {
  app.use(express.static(path.join(__dirname, '/docs')));

  nunjucks.configure('./src/views', {
    autoescape: true,
    express: app
  });

  app.get('/', function (req, res) {
      res.sendFile(__dirname + '/docs/index.html');
    }
  )

  app.listen(9090, function() {
    console.log('Example app listening on port 9090!');
  });
}

main()
// window.main = main;
