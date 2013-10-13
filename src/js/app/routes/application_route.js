App.ApplicationRoute = Em.Route.extend({
  actions: {
    auth: function(){
      debugger;
      // OAuth.redirect('tumblr', {}, '');
      OAuth.popup('tumblr', function(error, result) {
        debugger;
        //handle error with error
        //use result.access_token in your API request
      });
    },

    logout: function(){
        'use strict';
        // remove the authentication data
        this.router.namespace.AuthManager.reset();

        // remove all the removal_request's from memory
        this.store.unloadAllRecords();

        // and redirect to the homepage
        this.transitionTo('/');
    },

    error: function(e){
      setTimeout(function(){ throw e; }, 1000);
    }
  }
});
