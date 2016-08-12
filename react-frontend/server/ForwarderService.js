var request = require('superagent');


module.exports = function(endpoint) {
	return function(req, res, next) {
		console.log('Forwarding request', req.params, req.body, req.headers);
		request(req.method, endpoint + req.params.path)
			.set(req.headers)
			.send(req.body)
			.end( function(err, resBackend) {
				if(err) {
					if(err.status > 100 && err.status < 999) {
						console.log('Error forwarding request', err);
						res.status(err.status).send();
					}
					else {
						console.log('Encountered weird response code', err);
						res.status(500).send();
					}
				}
				else {
					//console.log(res);
					res.send(resBackend.text);
				}
			});
	}
}