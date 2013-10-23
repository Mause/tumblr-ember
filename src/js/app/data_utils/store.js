App.Store = DS.Store.extend({
  findQuery: function(type, query){
    query = query || {};

    if (!this.container.lookup('router:main').namespace.AuthManager.isAuthenticated()){
      query.api_key = 'a3yqP8KA1ztkIbq4hpokxEOwnUkleu2AMv0XsBWC0qLBKVL7pA';
    }

    return this._super(type, query);
  },

  allRecords: function(){
    var typeMaps = this.get('typeMaps'),
        records = [];
    for (var key in typeMaps){
      records = records.concat(typeMaps[key].records);
    }
    return records;
  },

  unloadAllRecords: function(){
    var records = this.allRecords(),
        record;

    while (record = records.pop()){
      record.unloadRecord();
    }
  },

  modelFor: function(type){
    if (type === 'post'){
      this.Post.typeKey = 'post';
      return this.Post;
    } else {
      return this._super(type);
    }
  },

  Post: DS.Model.extend(App.PostMixin)
});
