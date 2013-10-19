App.DashboardController = Em.ArrayController.extend({
  isLoading: false,
  loadingFailed: false,
  needs: ['application'],

  actions: {
    scroll: Em.aliasAction('loadMorePosts').debounce(100),
    tryAgain: function(){
      this.set('loadingFailed', false);
      this.send('loadMorePosts');
    },

    loadMorePosts: function(){
      'use strict';
      var query, oldPostsOrig, oldPosts,
          blog_name = this.get('controllers.application.metadata.name'),
          api_config = this.namespace.api_config,
          self = this;

      // don't try to load more posts if we're already loading some;
      // essentially a purpose built debouncing mechanism
      if (this.get('isLoading') || this.get('loadingFailed')){
        return;
      }

      oldPostsOrig = this.get('model');
      oldPosts = oldPostsOrig.get('content') || oldPostsOrig;

      query = {
        blog_name: blog_name,
        offset: api_config.next_offset(),
        limit: api_config.limit
      };

      Em.debug('Loading more posts...');
      this.set('isLoading', true);

      this.store.findQuery('post', query).then(
        Em.$.proxy(this.loadPostSuccess, this, oldPostsOrig),
        Em.$.proxy(this.loadPostFailure, this)
      );
    }
  },

  loadPostFailure: function(){
    this.setProperties({
      'isLoading': false,
      'loadingFailed': true
    });
    Em.debug('Loading posts failed.');
  },

  loadPostSuccess: function(oldPosts, newPosts){
    var combined = oldPosts.addObjects(newPosts);

    this.setProperties({
      'model': combined,
      'isLoading': false,
      'loadingFailed': false
    });

    Em.debug('Loading posts succeeded. Displaying %@ posts altogether'.fmt(
      combined.get('length')));
  }
});
