import Dispatcher from '../dispatcher/Dispatcher.jsx';
import request from 'superagent';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

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
                    cookie.save(Constants.WG_TOOLS_AUTH, jwtResponse.access_token, {'path': '/', 'maxAge': 30*24*3600});
                    browserHistory.push('/app');
                    location.reload();
                    // console.log(res, jwtResponse);
                    Dispatcher.dispatch({
                        actionType: Constants.LOGIN_SUCCESS,
                        jwt: jwtResponse.access_token
                    });

                }
            })
        ;
    },

    register(wgName, password) {
        request.post('http://localhost:5000/register')
            .send({wgName: wgName, password: password})
            .set('Content-Type', 'application/json; charset=UTF-8')
            .set('Access-Control-Allow-Origin', '*')
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {
                    // console.log(res);
                    browserHistory.push('/login');
                }
            })
        ;
    },

    logout() {
        cookie.remove(Constants.WG_TOOLS_AUTH, {'path': '/'});
        browserHistory.push('/login');
        Dispatcher.dispatch({
            actionType: Constants.LOGOUT_SUCCESS
        });
    },

    storeToken(token) {
        Dispatcher.dispatch({
            actionType: Constants.LOGIN_SUCCESS,
            jwt: token
        });
    },

    tryLoginByCookie() {
        let token = cookie.load(Constants.WG_TOOLS_AUTH);
        if (token) {
            LoginRegisterActions.storeToken(token);
            return token;
        }
        else {
            return null;
        }
    }

}

module.exports = LoginRegisterActions;
