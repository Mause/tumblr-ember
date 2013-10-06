App.Store.reopen({
  postStream: function(){
    var type = this.modelFor('post'),
      adapter = this.adapterFor(type),
      url = adapter.buildURL(type),
      defered = Em.RSVP.defer(),
      self=this,
      params;

    params = {
      api_key: 'a3yqP8KA1ztkIbq4hpokxEOwnUkleu2AMv0XsBWC0qLBKVL7pA'
    };

    adapter.ajax(url, 'GET', params).then(
      Em.$.proxy(this.successPostStream, this, defered, type),
      function(){
        debugger;
        defered.reject();
      }
    );

    return DS.PromiseArray.create({promise: defered.promise});
  },

  successPostStream: function(defered, type, json){
    'use strict';
    var serializer = this.serializerFor(type),
        payload = serializer.extractArray(this, null, json, null, null),
        all_posts = [],
        this_type,
        cur_posts,
        hash;

    for (var key in payload){
      hash = payload[key];
      this_type = serializer.typeForRoot(key);

      cur_posts = this.pushMany(this_type, hash);

      all_posts = all_posts.concat(cur_posts);
    }

    all_posts = all_posts.sortBy('timestamp');

    defered.resolve(all_posts);
  }
});
