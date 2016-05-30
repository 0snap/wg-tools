import request from 'superagent';
import cookie from 'react-cookie';
import Constants from '../constants/LoginConstants.jsx';


const endpoint = '/api/';


function getToken() {
	return cookie.load(Constants.WG_TOOLS_AUTH);

}

let ApiService = {

	call(method, path, payload, onSuccess, onError) {
		request(method, endpoint + path)
	        .send(payload)
	        .set('Content-Type', 'application/json; charset=UTF-8')
	        .set('Authorization', 'JWT ' + getToken())
	        .set('Access-Control-Allow-Origin', '*')
	        .end(function(err, res) {
	            if(err) {
	                onError(err);
	            }
	            else {
	               	onSuccess(res.body.text);
	            }
	    });
	},

	callUnauthed(method, path, payload, onSuccess, onError) {
		request(method, endpoint + path)
	        .send(payload)
	        .set('Content-Type', 'application/json; charset=UTF-8')
	        .set('Access-Control-Allow-Origin', '*')
	        .end(function(err, res) {
	            if(err) {
	                onError(err);
	            }
	            else {
	               	onSuccess(res.body.text);
	            }
	    });
	},

	login(payload, onSuccess, onError) {
		request.post(endpoint + 'auth')
	        .send(payload)
	        .set('Accept', 'application/jwt')
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
