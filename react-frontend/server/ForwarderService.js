var request = require('superagent');

// for query string retrieval
var nodeUrl = require('url');

module.exports = function(endpoint) {
	return function(req, res, next) {
		console.log('Forwarding request', req.params, nodeUrl.parse(req.url).query, req.body, req.headers);
		const queryString = nodeUrl.parse(req.url).query;
		const backendURL = queryString == null? endpoint + req.params.path : endpoint + req.params.path + '?' + queryString;
		request(req.method, backendURL)
			.set(req.headers)
			.send(req.body)
			.end( function(err, resBackend) {
				if(err) {
					if(err.status > 100 && err.status < 999) {
						console.error('Error forwarding request', err);
						res.status(err.status).send();
					}
					else {
						console.error('Encountered weird response code', err);
						res.status(500).send();
					}
				}
				else {
					//console.log(res);
					res.send(resBackend.text);
				}
			});
	};
};