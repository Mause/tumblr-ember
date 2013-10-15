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
          return Ember.RSVP.reject('Bad status code: %@ with message "%@"'.fmt(
            payload.meta.status, payload.meta.msg));
        }
      }
      return payload;
    };

    return promise.then(
      Em.$.proxy(success, this, promise),
      Em.$.proxy(this.failure, this, promise)
    );
  },

  failure: function(promise, error){
    Em.debug('Failed with: %@'.fmt(error.message));
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

    // both types of url star with the host and namespace
    url.push(host, namespace);

    if (!blog_name){
      // the currently authenticated users dashboard
      url.push('user/dashboard');

    } else {
      // whichever single blog is currently selected
      url.push(
        'blog',
        blog_name + '.tumblr.com',
        'posts', this.pathForType(type)
      );
    }

    // filter out falsy segments
    url = url.filter(function(x){ return !!x; });
    url = url.join('/');

    return url;
  },

  pathForType: function(type){
    // simply posts are accessable at the root url,
    // everything else is as per normal Ember Data
    // convention

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
