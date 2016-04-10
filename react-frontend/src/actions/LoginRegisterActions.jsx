import Dispatcher from '../dispatcher/Dispatcher.jsx';
import request from 'superagent';
import Constants from '../constants/LoginConstants.jsx';


let LoginRegisterActions = {

    login(wgName, password) {
        request.post('http://localhost:5000/auth')
            .send({username: wgName, password: password})
            .set('Accept', 'application/jwt')
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {
                    let jwtResponse = JSON.parse(res.text)
                    //console.log(res, jwtResponse);
                    Dispatcher.dispatch({
                        actionType: Constants.LOGIN_SUCCESS,
                        jwt: jwtResponse.access_token
                    });
                }
            })
        ;
    },

    storeToken(token) {
        Dispatcher.dispatch({
            actionType: Constants.LOGIN_SUCCESS,
            jwt: token
        });
    }

}

module.exports = LoginRegisterActions;
