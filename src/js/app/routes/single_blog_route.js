App.SingleBlogRoute = Em.Route.extend({
  model: function(params) {
    return this.store.findQuery('post', {blog_name: params.blog_name});
  },

  afterModel: function(model){
    var metadata = model.get('meta.blog'),
        application_controller_inst = this.container.lookup('controller:application');
    application_controller_inst.set('metadata', metadata);
  }
});
