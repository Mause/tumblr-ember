App.Store = DS.Store.extend({
  findQuery: function(type, id){
    id = id || {};
    id.api_key = App.API_KEY;
    id.blog_name = id.blog_name || 'mause-me';

    return this._super(type, id);
  }
});
