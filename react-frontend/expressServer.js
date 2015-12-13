var express = require('express');
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var compiler = webpack(config);


var app = express();
app.use(express.static('public'))


app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true // dont get the noisy "built" infos
}));

// hot middleware instead of webpack-dev-server
app.use(require('webpack-hot-middleware')(compiler));


app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});