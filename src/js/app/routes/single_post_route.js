App.SinglePostRoute = Em.Route.extend({
  templateName: '_single_post',

  model: function(params) {
    return this.store.findQuery('post', {
      blog_name: params.blog_name,
      id: params.post_id
    });
  }
});
