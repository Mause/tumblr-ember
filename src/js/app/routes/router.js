App.Router.reopen({
    location: 'history',

    init: function(){
        'use strict';
        this.namespace.AuthManager = AuthManager.create({namespace: this.namespace});
        return this._super.apply(this, arguments);
    },

    isAuthenticated: function() {
        'use strict';
        return this.namespace.AuthManager.isAuthenticated();
    }.property('this.namespace.AuthManager.apiKey')
});

App.Router.map(function(){
    this.resource('index', {path: '/'});
});
