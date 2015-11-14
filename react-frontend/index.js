require("babel-core/register")

// frontend side node server, decouples backend implementation completely from view.
var server = require('./server/expressServer')()
server.listen(80);