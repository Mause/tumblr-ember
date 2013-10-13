App.Store = DS.Store.extend({
  findQuery: function(type, id){
    id = id || {};
    id.api_key = App.API_KEY;

    return this._super(type, id);
  },

  unloadAllRecords: function(){
    var typeMaps = this.get('typeMaps'),
        records = [],
        record;

    for (var key in typeMaps){
      records = records.concat(typeMaps[key].records);
    }

    while (record = records.pop()){
      record.unloadRecord();
    }
  }
});
