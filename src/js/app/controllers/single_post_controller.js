App.SinglePostController = Em.ObjectController.extend({
  post: function(){
    return this.get('content').objectAt(0);
  }.property('content')
});
