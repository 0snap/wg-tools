import Dispatcher from '../dispatcher/Dispatcher.jsx';
import EventEmitter from 'events';
import assign from 'object-assign';
import Constants from '../constants/LoginConstants.jsx';

var _jwt;

function storeLogin(jwt) {
    //console.log('storing jwt ' + jwt);
    _jwt = jwt;
}

function logout() {
    _jwt = null;
}

let LoginStore = assign({ }, EventEmitter.prototype, {

    emitChange(event) {
        this.emit(event);
    },

    addEventListener(event, callback) {
        this.on(event, callback);
    },

    removeEventListener(event, callback) {
        this.removeListener(event, callback);
    },

    getToken() {
        return _jwt;
    },

    isLoggedIn() {
        return !! _jwt;
    }
})

Dispatcher.register(function(action) {

    switch(action.actionType) {
        case(Constants.LOGIN_SUCCESS):
            storeLogin(action.jwt);
            LoginStore.emitChange(Constants.LOGIN_STATUS_CHANGED);
            break;
        case(Constants.LOGOUT_SUCCESS):
            logout();
            LoginStore.emitChange(Constants.LOGIN_STATUS_CHANGED);
            break;
    }
})

module.exports = LoginStore