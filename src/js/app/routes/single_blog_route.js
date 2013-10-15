App.SingleBlogRoute = Em.Route.extend({
  model: function(params) {
    var namespace = this.router.namespace;

    return this.store.findQuery('post', {
      blog_name: params.blog_name,
      limit: namespace.api_config.limit
    });
  },

  setMetadata: function(metadata){
    this.container.lookup('controller:application').set('metadata', metadata);
  },

  afterModel: function(model){
    this.setMetadata(model.get('meta.blog'));
  },

  deactivate: function() {
    this.setMetadata({});
    this.store.unloadAllRecords();
  }
});
