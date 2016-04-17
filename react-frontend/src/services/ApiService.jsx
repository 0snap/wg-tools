import request from 'superagent';

var loginStore = require('../stores/LoginStore.jsx');


const endpoint = 'http://localhost:3000/api/';

let ApiService = {

	call(path, payload, onSuccess, onError) {
		request.post(endpoint + path)
	        .send(payload)
	        .set('Content-Type', 'application/json; charset=UTF-8')
	        .set('Authorization', 'JWT ' + loginStore.getToken())
	        .set('Access-Control-Allow-Origin', '*')
	        .end(function(err, res) {
	            if(err) {
	                onError(err);
	            }
	            else {
	               	onSuccess(res.body.text);
	            }
	    });
	}
}

module.exports = ApiService;
