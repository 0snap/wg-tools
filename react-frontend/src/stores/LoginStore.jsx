import Dispatcher from '../dispatcher/Dispatcher.jsx';
import EventEmitter from 'events';
import assign from 'object-assign';
import Constants from '../constants/LoginConstants.jsx';

var _wgName;
var _jwt;

function storeLogin(wgName, jwt) {
    console.log('storing jwt ' + jwt);
    _wgName = wgName;
    _jwt = jwt;
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

    getWgName() {
        return _wgName;
    },

    getToken() {
        return _jwt;
    },

    isLoggedIn() {
        return !!_wgName;
    }
})

Dispatcher.register(function(action) {

    switch(action.actionType) {
        case(Constants.LOGIN_SUCCESS):
            storeLogin(action.wgName, action.jwt);
            LoginStore.emitChange(Constants.LOGIN_STATUS_CHANGED);
            break;
    }
})

module.exports = LoginStore