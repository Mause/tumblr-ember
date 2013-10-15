App.SingleBlogRoute = App.DashboardRoute.extend({
  beforeModel: Em.K,

  model: function(params) {
    var namespace = this.router.namespace;

    return this.store.findQuery('post', {
      limit: namespace.api_config.limit,
      blog_name: params.blog_name
    });
  },

  afterModel: function(model){
    this.setMetadata(model.get('meta.blog'));
  },

  deactivate: function() {
    this.setMetadata({});
    return this._super();
  }
});
