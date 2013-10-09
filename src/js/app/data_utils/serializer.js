App.ApplicationSerializer = DS.RESTSerializer.extend({
  generateIds: function(records, parent_id) {
    for (var i=0; i<records.length; i++) {
      records[i].id = '%@.%@'.fmt(parent_id, i);
    }
    return records;
  },

  extractArray: function(store, type, payload, id, requestType) {
    payload = this.sortPostArray(store, type, payload, id, requestType);
    return this.extractEmbedded(store, type, payload, id, requestType);
  },

  sortPostArray: function(store, type, payload, id, requestType) {
    'use strict';
    var unsorted_posts = payload.response.posts,
        posts = {},
        post,
        post_type;
    delete payload.response;
    delete payload.meta;

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
    var record,
        parent_name,
        embedded_key,
        embedded_name,
        current_records,
        embedded_records,
        embedded_record_key;

    // iterate through the possible embedded keys
    for (var i=0; i<this.embedded_records_keys.length; i++) {
      embedded_record_key = this.embedded_records_keys[i];

      parent_name = embedded_record_key[0];
      embedded_name = embedded_record_key[1];
      embedded_key = embedded_record_key[2];

      if (!payload.hasOwnProperty(parent_name)){
        continue;
      }

      embedded_records = [];
      for (var q=0; q<payload[parent_name].length; q++) {
        record = payload[parent_name][q];

        current_records = this.generateIds(record[embedded_key], record.id);

        record[embedded_key] = current_records.mapBy('id');

        embedded_records = embedded_records.concat(current_records);
      }

      if (!payload.hasOwnProperty(embedded_name)){
        payload[embedded_name] = [];
      }

      payload[embedded_name] = payload[embedded_name].concat(embedded_records);
    }

    return payload;
  },

  embedded_records_keys: [
    ['photo', 'sub_photo', 'photos'],
    ['sub_photo', 'sub_photo_instance', 'alt_sizes']
  ]
});
