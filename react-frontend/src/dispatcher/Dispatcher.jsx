import {Dispatcher} from 'flux';

var dispatcher = new Dispatcher();
var actions = [];
var isProcessing = false;

function dispatch(payload) {
    actions.push(payload)
    
    if (!isProcessing) {
        process()
    }
}

function process() {
    isProcessing = true
    while (actions.length > 0) {
        if (dispatcher.isDispatching()) {
            return setTimeout(process, 100)
        }
        var payload = actions.shift()
        dispatcher.dispatch(payload)
    }
    isProcessing = false
}

var QueuingDispatcher = {
    isProcessing() {
        return isProcessing;
    },

    dispatch(payload) {
        dispatch(payload);
    },

    register(callback) {
        return dispatcher.register(callback);
    }
}
module.exports = QueuingDispatcher