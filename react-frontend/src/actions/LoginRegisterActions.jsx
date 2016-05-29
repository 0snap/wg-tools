import Dispatcher from '../dispatcher/Dispatcher.jsx';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

import Constants from '../constants/LoginConstants.jsx';
var apiService = require('../services/ApiService.jsx');

let LoginRegisterActions = {

    login(wgName, password) {
        apiService.login( { username: wgName, password: password },
            function(textResp) {
                let jwtResponse = JSON.parse(textResp);
                cookie.save(Constants.WG_TOOLS_AUTH, jwtResponse.access_token, {'path': '/', 'maxAge': 30*24*3600});
                browserHistory.push('/app');
                location.reload();
                Dispatcher.dispatch({
                    actionType: Constants.LOGIN_SUCCESS,
                    jwt: jwtResponse.access_token
                });
            },
            function(err) { 
                Dispatcher.dispatch({
                    actionType: Constants.LOGIN_ERROR,
                    err: err
                });
            }
        );
    },

    register(wgName, password) {
        apiService.callUnauthed('POST', 'register', { wgName: wgName, password: password },
            function(textResp) {
                browserHistory.push('/login');
            },
            function(err) {
                Dispatcher.dispatch({
                    actionType: Constants.REGISTER_ERROR,
                    err: err
                });
            }
        );
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
            return true;
        }
        else {
            return false;
        }
    }

}

module.exports = LoginRegisterActions;
