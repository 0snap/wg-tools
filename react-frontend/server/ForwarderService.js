var request = require('superagent');


module.exports = function(endpoint) {
	return function(req, res, next) {
		request(req.method, endpoint + req.params.path)
			.set(req.headers)
			.send(req.body)
			.end( function(err, resBackend) {
				if(err) {
					console.log(err);
					res.sendStatus(500);
				}
				else {
					res.send(resBackend);
				}
			});
	}
}