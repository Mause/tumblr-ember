App.DashboardController = Em.ArrayController.extend({
  isLoading: false,
  needs: ['application'],

  actions: {
    scroll: function(){
      'use strict';
      if (this.get('isLoading')){
        return;
      }

      var oldPosts = this.get('model');
      if (Em.typeOf(oldPosts) != 'array'){
        oldPosts = oldPosts.get('content');
      }

      var lastOldPost = oldPosts.sortBy('timestamp').get('lastObject'),
          last_id = lastOldPost.get('id'),
          blog_name = this.get('controllers.application.metadata.name'),
          self=this;

      var query = {
        since_id: last_id,
        blog_name: blog_name
      };

      Em.debug('Loading more posts...');

      this.set('isLoading', true);

      this.store.findQuery('post', query).then(
        Em.$.proxy(this.loadPostSuccess, this, oldPosts),
        Em.$.proxy(this.loadPostFailure, this)
      );
    }
  },

  loadPostFailure: function(){
    Em.debug('Loading posts failed.');
    debugger;
  },

  loadPostSuccess: function(oldPosts, newPosts){
    Em.debug('Loading posts succeeded. Displaying....');

    var combined = oldPosts.addObjects(newPosts);
    combined = combined.compact();

    this.set('model', combined);
    this.set('isLoading', false);
  }
});
