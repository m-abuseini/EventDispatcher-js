
var EventDispatcher = {
    listeners: {},
    attach: function(evt_name, callback) {
        if (!Object.prototype.hasOwnProperty.call(this.listeners, evt_name)) {
            this.listeners[evt_name] = [];
        }
        this.listeners[evt_name].push(callback);
    },
    attachOnce: function(evt_name, callback) {
        var once = function() {
            try {
                return callback.apply(this, arguments);
            } finally {
                this.off(evt_name, once);
            }
        };
        this.on(evt_name, once);
    },
    deattach: function(evt_name, callback) {
        if (Object.prototype.hasOwnProperty.call(this.listeners, evt_name)) {
            var listeners = this.listeners[evt_name];
            for (var i = 0, l = listeners.length; i < l; i++) {
                if (listeners[i] === callback) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        }
    },
    fire: function(evt_name) {
        if (Object.prototype.hasOwnProperty.call(this.listeners, evt_name)) {
            var listeners = this.listeners[evt_name];
            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0, l = listeners.length; i < l; i++) {
                listeners[i].apply(this, args);
            }
        }
    }
};