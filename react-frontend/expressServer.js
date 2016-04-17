var express = require('express');
var path = require('path');
var webpack = require('webpack');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var forwarder = require('./src/services/ForwarderService.jsx');

var config = require(path.resolve(__dirname, 'webpack.config.' + process.env.NODE_ENV + '.js'));
var compiler = webpack(config);

var app = express();

if(process.env.NODE_ENV == 'development') {
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true // dont get the noisy "built" infos
    }));

    // hot middleware instead of webpack-dev-server
    app.use(require('webpack-hot-middleware')(compiler));
}
else {
    app.use(express.static('public'));
}

// forward all requests to api
app.all('/api/:path', jsonParser, forwarder);


app.all('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});