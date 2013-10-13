App.IndexRoute = Em.Route.extend({
//   // activate: function() {},
//   // deactivate: function() {},
//   // setupController: function(controller, model) {},
//   // renderTemplate: function() {},
//   // beforeModel: function() {},
//   // afterModel: function() {},

  model: function() {
    return this.store.findQuery('post');
  },

  actions: {
    auth: function(){
      //Using popup (option 1)
      debugger;
      OAuth.popup('tumblr', function(error, result) {
        debugger;
        //handle error with error
        //use result.access_token in your API request
      });
    }
  }
});
