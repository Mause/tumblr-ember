App.SingleBlogRoute = App.DashboardRoute.extend({
  beforeModel: Em.K,

  model: function(params) {
    'use strict';
    var namespace = this.router.namespace;
    namespace.api_config.next_offset();

    Em.debug('Loading posts from the blog %@'.fmt(params.blog_name));

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
