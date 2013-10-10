App.ApplicationAdapter = DS.RESTAdapter.extend({
  ajax: function(url, type, hash){
    var promise = this._super(url, type, hash), success;

    success = function(promise, payload){
      if (payload.meta && payload.meta.status){
        if (payload.meta.status !== 200){
          return Ember.RSVP.reject('Bad status code');
        }
      }
      return payload;
    };

    return promise.then(
      Em.$.proxy(success, this, promise)
      // we don't care about failure here
    );
  },

  ajaxOptions: function(url, type, hash){
    hash = this._super(url, type, hash);

    if (this.get('online'))
      hash.dataType = 'jsonp';

    return hash;
  },

  buildURL: function(type, id){
    'use strict';
    var url = this._super.call(this, type, id);

    if (url.charAt(url.length-1) === '/'){
      return url.substring(0, url.length-1);
    } else {
      return url;
    }
  },

  pathForType: function(type){
    if (type == 'post'){
      return '';
    } else {
      return this._super(type);
    }
  }
});

if (false){
  App.ApplicationAdapter.reopen({
    host: 'http://api.tumblr.com',
    namespace: 'v2/blog/mause-me.tumblr.com/posts',
    online: true
  });
} else {
  App.ApplicationAdapter.reopen({
    namespace: 'posts',
    online: false
  });
}
