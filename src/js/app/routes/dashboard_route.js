App.DashboardRoute = Em.Route.extend({
  namespace: null,

  init: function(){
    this.namespace = this.router.namespace;
  },

  beforeModel: function(){
    if (!this.router.get('isAuthenticated')){
      this.transitionTo('authenticate');
    }
  },

  model: function() {
    this.namespace.api_config.offset += this.namespace.api_config.limit;

    return this.store.findQuery('post', {
      limit: this.namespace.api_config.limit
    });
  },

  afterModel: function(model){
    this.setMetadata({});
  },

  deactivate: function() {
    this.namespace.api_config.offset = 0;
    this.store.unloadAllRecords();
  },

  setMetadata: function(metadata){
    this.container.lookup('controller:application').set('metadata', metadata);
  }
});
