App.DashboardRoute = Em.Route.extend({
  beforeModel: function(){
    if (!this.router.get('isAuthenticated')){
      this.transitionTo('authenticate');
    }
  },

  model: function() {
    var namespace = this.router.namespace;
    namespace.api_config.offset += namespace.api_config.limit;

    return this.store.findQuery('post', {
      limit: namespace.api_config.limit
    });
  },

  afterModel: function(model){
    this.setMetadata({});
  },

  deactivate: function() {
    namespace.api_config.offset = 0;
    this.store.unloadAllRecords();
  },

  setMetadata: function(metadata){
    this.container.lookup('controller:application').set('metadata', metadata);
  }
});
