App.Store = DS.Store.extend({
  findQuery: function(type, id){
    id = id || {};
    id.api_key = App.API_KEY;

    return this._super(type, id);
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
