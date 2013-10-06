App.ApplicationRoute = Em.Route.extend({
  actions: {
    error: function(e){
      setTimeout(function(){ throw e; }, 1000);
    }
  }
});
