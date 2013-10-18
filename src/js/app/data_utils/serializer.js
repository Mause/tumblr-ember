App.ApplicationSerializer = DS.RESTSerializer.extend({
  // we want to extract the metadata later, so we override
  extractMeta: Em.K,

  generateIds: function(records, parent_id) {
    for (var i=0; i<records.length; i++) {
      records[i].id = '%@.%@'.fmt(parent_id, i);
    }
    return records;
  },

  extractArray: function(store, type, payload, id, requestType) {
    var metadata;
    if (!Em.isNone(payload)){
      metadata = payload.meta;
      metadata.blog = payload.response.blog;
      delete payload.meta;
      delete payload.response.blog;
    }

    payload = this.splitPostArray(store, type, payload, id, requestType);
    payload = this.extractEmbedded(store, type, payload, id, requestType);
    payload = this.normalizeArray(store, type, payload, id, requestType);
    payload = this.transmogrify(store, type, payload, id, requestType);

    payload.metadata = metadata || {};
    return payload;
  },

  transmogrify: function(store, type, payload, id, requestType){
    'use strict';
    var all_posts = [],
        this_type,
        cur_posts,
        hash,
        top_level_posts;

    for (var key in payload){
      if (!payload.hasOwnProperty(key)) { continue; }

      hash = payload[key];
      this_type = this.typeForRoot(key);

      cur_posts = store.pushMany(this_type, hash);
      all_posts = all_posts.concat(cur_posts);
    }

    all_posts = all_posts.sortBy('timestamp');
    top_level_posts = all_posts.filter(this.filter);

    return top_level_posts;
  },

  filter: function(item){
    return ['photo', 'video', 'quote', 'text'].contains(item.get('type'));
  },

  normalizeArray: function(store, primaryType, payload) {
    payload = this.normalizePayload(primaryType, payload);

    for (var prop in payload) {
      var typeName = this.typeForRoot(prop),
          type = store.modelFor(typeName),
          typeSerializer = store.serializerFor(type);

      /*jshint loopfunc:true*/
      payload[prop] = payload[prop].map(function(hash) {
        return typeSerializer.normalize(type, hash, prop);
      }, this);

    }
    return payload;
  },

  splitPostArray: function(store, type, payload, id, requestType) {
    'use strict';
    var unsorted_posts = payload.response.posts,
        posts = {},
        post,
        post_type;
    payload = {};

    for (var i=0; i<unsorted_posts.length; i++){
      post = unsorted_posts[i];
      post_type = post['type'];

      if (!payload.hasOwnProperty(post_type)) {
        payload[post_type] = [];
      }

      payload[post_type].push(post);
    }

    return payload;
  },

  extractEmbedded: function(store, type, payload, id, requestType) {
    'use strict';
    var done_keys = [],
        self=this,
        done = function(pTN){ return !done_keys.contains(pTN); },
        typeNames,
        typeName,
        parentType;

    while (true){
      typeNames = Ember.keys(payload).filter(done);
     if (Em.isEmpty(typeNames)){
        break;
      } else {
        typeName = typeNames.objectAt(0);
      }

      parentType = this.store.modelFor(typeName);
      /*jshint loopfunc:true*/
      parentType.eachRelationship(function(name, meta){
        if (meta.options.embedded){
          Ember.debug('extracting records from the %@ attribute from %@ record'.fmt(
            name, typeName));
          payload = self.process(payload, typeName, name, meta);
        }
      });

      done_keys.push(typeName);
    }

    return payload;
  },

  process: function(payload, parentTypeName, name, meta){
    'use strict';

    var embedded_records = [],
        current_records,
        record;

    for (var q=0; q<payload[parentTypeName].length; q++) {
      // grab the record
      record = payload[parentTypeName][q];

      if (Em.typeOf(record[name]) === 'object'){
        // belongsTo relationship
        record[name].id = '%@.%@'.fmt(record.id, name);

        embedded_records.push(record[name]);

        record[name] = record[name].id;
      } else {
        // hasMany relationship

        // generate ids for each of the embedded records
        current_records = this.generateIds(record[name], record.id);

        // grab the generated ids, insert into the record
        record[name] = current_records.mapBy('id');

        // store the embedded records for processing
        embedded_records = embedded_records.concat(current_records);
      }
    }

    if (!payload.hasOwnProperty(meta.type.typeKey)){
      payload[meta.type.typeKey] = [];
    }

    payload[meta.type.typeKey] = payload[meta.type.typeKey].concat(
      embedded_records);

    return payload;
  }
});

DS.AdapterPopulatedRecordArray.reopen({
  load: function(records){
    metadata = records.metadata;
    delete records.metadata;

    if (Ember.get(this, 'type') === this.store.Post){
      this.setProperties({
        content: Ember.A(records),
        isLoaded: true,
        meta: metadata
      });
      Ember.run.once(this, 'trigger', 'didLoad');
    } else {
      return this._super.call(this, records);
    }
  }
});
