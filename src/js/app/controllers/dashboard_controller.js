App.DashboardController = Em.ArrayController.extend({
  isLoading: false,
  needs: ['application'],

  actions: {
    scroll: function(){
      'use strict';

      // don't try to load more posts if we're already loading some;
      // esssentially a purpose built debouncing mechanism
      if (this.get('isLoading')){
        return;
      }

      var oldPostsOrig = this.get('model'), oldPosts;

      if (Em.typeOf(oldPosts) != 'array'){
        oldPosts = oldPostsOrig.get('content');
      } else {
        oldPosts = oldPostsOrig;
      }

      // counter intuitive, i know
      var lastOldPost = oldPosts.sortBy('timestamp').get('lastObject'),
          last_id = lastOldPost.get('id'),
          blog_name = this.get('controllers.application.metadata.name'),
          self = this;

      var query = {
        // since_id: last_id,
        blog_name: blog_name,
        offset: this.namespace.api_config.up_to
      };

      this.namespace.api_config.up_to += this.namespace.api_config.limit;

      Em.debug('Loading more posts...');

      this.set('isLoading', true);

      this.store.findQuery('post', query).then(
        Em.$.proxy(this.loadPostSuccess, this, oldPostsOrig),
        Em.$.proxy(this.loadPostFailure, this)
      );
    }.debounce(100)
  },

  loadPostFailure: function(){
    Em.debug('Loading posts failed.');
  },

  loadPostSuccess: function(oldPosts, newPosts){
    Em.debug('oldPosts: %@, newPosts: %@'.fmt(oldPosts.get('length'), newPosts.get('length')));

    var combined = oldPosts.addObjects(newPosts);

    Em.debug('Loading posts succeeded. Displaying %@ posts altogether'.fmt(
      combined.get('length')));

    this.set('model', combined);
    this.set('isLoading', false);
  }
});
