App.SingleBlogRoute = Em.Route.extend({
  model: function(params) {
    return this.store.findQuery('post', {blog_name: params.blog_name});
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
