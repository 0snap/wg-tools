var express = require('express');
var path = require('path');
var absPath = function(filename) { return path.resolve(__dirname, filename); };
//var statusCodeRouter = require('./status-code-router.js')


module.exports = function() {
    var expressServer = express();

    expressServer.use(express.static(absPath('../public')));

    expressServer.get('/', function (req, res) {
        res.send('Hello World!');
    });

    //expressServer.use(statusCodeRouter)
    return expressServer;
}
