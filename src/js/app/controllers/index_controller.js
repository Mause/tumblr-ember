App.IndexController = Em.ArrayController.extend({
  actions: {
    scroll: function(){
      'use strict';
      var model = this.get('model'),
          last_post = model.get('lastObject'),
          last_id = last_post.get('id'),
          self=this;

      var query = {
        since_id: last_id
      };

      Em.debug('Loading more posts...');

      this.store.findQuery('post', query).then(function(new_posts){
        Em.debug('Loading posts succeeded. Displaying....');

        model = model.content.concat(new_posts.content);
        model = DS.RecordArray.create({
          type: App.Post,
          content: Ember.A(model),
          store: self.store,
          isLoaded: true
        });

        self.set('model', model);

      }, function(){
        Em.debug('Loading posts failed.');
        debugger;
      });
    }
  }
});
