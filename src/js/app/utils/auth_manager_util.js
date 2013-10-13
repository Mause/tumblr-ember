var AuthManager = Ember.Object.extend({
    namespace: null,

    // Load the current user if the cookies exist and is valid
    init: function() {
        'use strict';
        this._super();
        var accessToken = Ember.$.cookie('access_token');
        var authUserId  = Ember.$.cookie('auth_user');
        if (!Ember.isEmpty(accessToken) && !Ember.isEmpty(authUserId)) {
            this.authenticate(accessToken, authUserId);
        }
    },

    // Determine if the user is currently authenticated.
    isAuthenticated: function() {
        'use strict';
        return !Ember.isEmpty(this.get('apiKey.accessToken')) && !Ember.isEmpty(this.get('apiKey.user'));
    },

    // Authenticate the user. Once they are authenticated, set the access token to be submitted with all
    // future AJAX requests to the server.
    authenticate: function(accessToken, userId) {
        'use strict';
        this.set('this.namespace.API_KEY', accessToken);

        // var user = User.find(userId);
        this.set('apiKey', this.namespace.ApiKey.create({
            accessToken: accessToken,
            user: {Id: userId}
        }));
    },

    // Log out the user
    reset: function() {
        'use strict';
        this.namespace.__container__.lookup("route:application").transitionTo('authenticate');
        Ember.run.sync();
        Ember.run.next(this, function(){
            this.set('apiKey', null);

            this.set('this.namespace.API_KEY', '');
        });
    },

    // Ensure that when the apiKey changes, we store the data in cookies in order for us to load
    // the user when the browser is refreshed.
    apiKeyObserver: function() {
        'use strict';
        var apiKey = this.get('apiKey');
        if (Ember.isEmpty(apiKey)) {
            Ember.$.removeCookie('access_token');
            Ember.$.removeCookie('auth_user');
        } else {
            Ember.$.cookie('access_token', apiKey.get('accessToken'));
            Ember.$.cookie('auth_user', apiKey.get('user.Id'));
        }
    }.observes('apiKey')
});

// Reset the authentication if any ember data request returns a 401 unauthorized error
DS.rejectionHandler = function(reason) {
    if (reason.status === 401) {
        App.AuthManager.reset();
    }
    throw reason;
};

App.ApiKey = Ember.Object.extend({
  access_token: '',
  user: null
});
