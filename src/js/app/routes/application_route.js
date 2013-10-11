App.ApplicationRoute = Em.Route.extend({
  actions: {
    logout: function(){
        'use strict';
        // remove the authentication data
        TableSelectWeb.AuthManager.reset();

        // remove all the removal_request's from memory
        this.store.unloadAll('removal_request');

        // and redirect to the homepage
        this.transitionTo('/');
    },
    error: function(e){
      setTimeout(function(){ throw e; }, 1000);
    }
  }
});
