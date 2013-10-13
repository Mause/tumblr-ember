App.DashboardRoute = Em.Route.extend({
  model: function() {
    return this.store.findQuery('post');
  },

  afterModel: function(model){
    this.container.lookup('controller:application').set('metadata', null);
  },

  actions: {
    auth: function(){
      debugger;
      // OAuth.redirect('tumblr', {}, '');
      OAuth.popup('tumblr', function(error, result) {
        debugger;
        //handle error with error
        //use result.access_token in your API request
      });
    }
  }
});
