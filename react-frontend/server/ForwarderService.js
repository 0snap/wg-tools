var request = require('superagent');


module.exports = function(endpoint) {
	return function(req, res, next) {
		try {
			request(req.method, endpoint + req.params.path)
				.set(req.headers)
				.send(req.body)
				.end( function(err, resBackend) {
					if(err) {
						console.log('Error forwarding request', endpoint, err);
						if(err.status > 100 && err.status < 999) {
							res.status(err.status).send(err);
						}
						else res.status(500).send('Undefined status code returned from Backend');
					}
					else {
						res.send(resBackend);
					}
				});
		}
		catch (ex) {
			console.log('Exception occurred while forwarding request', req);
			res.status(500).send('Error');
		}
	}
}