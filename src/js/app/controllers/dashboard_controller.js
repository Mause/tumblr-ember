App.DashboardController = Em.ArrayController.extend({
  isLoading: false,
  loadingFailed: false,
  needs: ['application'],

  actions: {
    scroll: Em.aliasAction('loadMorePosts').debounce(100),
    tryAgain: Em.aliasAction('loadMorePosts', true),

    loadMorePosts: function(resetLoadingFailed){
      'use strict';

      if (resetLoadingFailed)
        this.set('loadingFailed', false);

      // don't try to load more posts if we're already loading some;
      // esssentially a purpose built debouncing mechanism
      if (this.get('isLoading') || this.get('loadingFailed')){
        return;
      }

      var oldPostsOrig = this.get('model'), oldPosts;

      if (Em.typeOf(oldPosts) != 'array'){
        oldPosts = oldPostsOrig.get('content');
      } else {
        oldPosts = oldPostsOrig;
      }

      var blog_name = this.get('controllers.application.metadata.name'),
          self = this;

      var query = {
        blog_name: blog_name,
        offset: this.namespace.api_config.up_to,
        limit: this.namespace.api_config.limit
      };
      this.namespace.api_config.up_to += this.namespace.api_config.limit;


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
