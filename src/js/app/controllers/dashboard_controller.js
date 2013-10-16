App.DashboardController = Em.ArrayController.extend({
  isLoading: false,
  loadingFailed: false,
  needs: ['application'],

  actions: {
    scroll: Em.aliasAction('loadMorePosts').debounce(100),
    tryAgain: Em.aliasAction('loadMorePosts', true),

    loadMorePosts: function(resetLoadingFailed){
      'use strict';
      var query, oldPostsOrig, oldPosts,
          blog_name = this.get('controllers.application.metadata.name'),
          api_config = this.namespace.api_config,
          self = this;

      if (resetLoadingFailed)
        this.set('loadingFailed', false);

      // don't try to load more posts if we're already loading some;
      // esssentially a purpose built debouncing mechanism
      if (this.get('isLoading') || this.get('loadingFailed')){
        return;
      }

      oldPostsOrig = this.get('model');
      oldPosts = oldPostsOrig.get('content') || oldPostsOrig;

      query = {
        blog_name: blog_name,
        offset: api_config.offset,
        limit: api_config.limit
      };
      api_config.step();

      Em.debug('Loading more posts...');
      this.set('isLoading', true);

      this.store.findQuery('post', query).then(
        Em.$.proxy(this.loadPostSuccess, this, oldPostsOrig),
        Em.$.proxy(this.loadPostFailure, this)
      );
    }
  },

  loadPostFailure: function(){
    this.set('isLoading', false);
    this.set('loadingFailed', true);
    Em.debug('Loading posts failed.');
  },

  loadPostSuccess: function(oldPosts, newPosts){
    Em.debug('oldPosts: %@, newPosts: %@'.fmt(oldPosts.get('length'), newPosts.get('length')));

    var combined = oldPosts.addObjects(newPosts);

    Em.debug('Loading posts succeeded. Displaying %@ posts altogether'.fmt(
      combined.get('length')));

    this.set('model', combined);
    this.set('isLoading', false);

    // to be sure, to be sure
    this.set('loadingFailed', false);
  }
});
