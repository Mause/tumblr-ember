App.DashboardRoute = Em.Route.extend({
  beforeModel: function(){
    if (!this.router.get('isAuthenticated')){
      this.transitionTo('authenticate');
    }
  },

  model: function() {
    return this.store.findQuery('post');
  },

  afterModel: function(model){
    this.container.lookup('controller:application').set('metadata', null);
  },

  deactivate: function() {
    this.store.unloadAllRecords();
  }
});
