App.DashboardController = Em.ArrayController.extend({
  isLoading: false,
  loadingFailed: false,
  needs: ['application'],

  actions: {
    scroll: Em.aliasAction('loadPosts').debounce(100),
    tryAgain: function(){
      this.set('loadingFailed', false);
      this.send('loadPosts');
    },

    loadNew: function(){
      var model = this.get('model'),
          oldPosts = (model.get('content') || model).sortBy('timestamp').reverse();

      this.send('loadPosts', {
        since_id: oldPosts.objectAt(0).get('id')
      });
    },

    loadPosts: function(query){
      'use strict';
      var oldPosts,
          blog_name = this.get('controllers.application.metadata.name'),
          api_config = this.namespace.api_config,
          query = query || {},
          self = this;

      // don't try to load more posts if we're already loading some;
      // essentially a purpose built debouncing mechanism
      if (this.get('isLoading') || this.get('loadingFailed')){
        return;
      }

      oldPosts = this.get('model');
      oldPosts = oldPosts.get('content') || oldPosts;

      Em.merge(query, {
        blog_name: blog_name,
        offset: api_config.next_offset(),
        limit: api_config.limit
      });

      Em.debug('Loading more posts...');
      this.set('isLoading', true);

      this.store.findQuery('post', query).then(
        Em.$.proxy(this.loadPostSuccess, this, oldPosts),
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
      'model': combined.sortBy('timestamp').reverse(),
      'isLoading': false,
      'loadingFailed': false
    });

    Em.debug('Loading posts succeeded. Displaying %@ posts altogether'.fmt(
      combined.get('length')));
  }
});
