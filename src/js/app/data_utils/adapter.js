App.ApplicationAdapter = DS.RESTAdapter.extend({
  findQuery: function(store, type, query) {
    query.limit = 5;
    return this.ajax(this.buildURL(type.typeKey, query), 'GET', {data: query});
  },

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

  buildURL: function(type, query){
    'use strict';
    var url = [],
        host = this.get('host'),
        namespace = this.get('namespace'),
        blog_name = query.blog_name;
    delete query.blog_name;

    url.push(host);
    if (Ember.isEmpty(query)){
      url.push('user/dashboard');
    } else {
      url.push(namespace, 'blog');
      url.push(blog_name + '.tumblr.com');
      url.push('posts', this.pathForType(type));
    }

    url = url.filter(function(x){ return !!x; });
    url = url.join('/');

    return url;
  },

  pathForType: function(type){
    if (type == 'post'){
      return '';
    } else {
      return this._super(type);
    }
  }
});

if (!false){
  App.ApplicationAdapter.reopen({
    host: 'http://api.tumblr.com',
    namespace: 'v2',
    online: true
  });
} else {
  App.ApplicationAdapter.reopen({
    namespace: 'posts',
    online: false
  });
}
