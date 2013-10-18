App.SinglePostRoute = Em.Route.extend({
  model: function(params) {
    return this.store.findQuery('post', {
      blog_name: params.blog_name,
      id: params.post_id
    });
  }
});
