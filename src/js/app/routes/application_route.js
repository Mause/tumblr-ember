App.ApplicationRoute = Em.Route.extend({
  actions: {
    logout: function(){
        'use strict';
        // remove the authentication data
        this.namespace.AuthManager.reset();

        debugger;
        // remove all the removal_request's from memory
        this.store.unloadAll();

        // and redirect to the homepage
        this.transitionTo('/');
    },
    error: function(e){
      setTimeout(function(){ throw e; }, 1000);
    }
  }
});
