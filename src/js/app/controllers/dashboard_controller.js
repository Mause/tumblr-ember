App.IndexController = Em.ArrayController.extend({
  isLoading: false,

  actions: {
    scroll: function(){
      'use strict';
      if (this.get('isLoading')){
        return;
      }

      var oldPosts = this.get('model'),
          lastOldPost = oldPosts.get('lastObject'),
          last_id = lastOldPost.get('id'),
          self=this;

      var query = {
        since_id: last_id
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
    var combined;
    debugger;
    Em.debug('Loading posts succeeded. Displaying....');

    combined = oldPosts.addObjects(newPosts);
    combined = combined.sortBy('timestamp');
    combined = combined.compact();

    // combined = oldPosts.content.concat(newPosts.content);
    // combined = DS.RecordArray.create({
    //   type: App.Post,
    //   content: Ember.A(model),
    //   store: this.store,
    //   isLoaded: true
    // });

    this.set('model', combined);
    this.set('isLoading', false);
  }
});
