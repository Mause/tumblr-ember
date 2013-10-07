App.IndexController = Em.ArrayController.extend({
    postStream: function(){
        return this.store.postStream();
    }.property()
});
