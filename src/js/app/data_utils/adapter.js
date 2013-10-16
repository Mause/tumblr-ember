App.ApplicationAdapter = DS.RESTAdapter.extend({
  api_host: 'http://api.tumblr.com',
  api_namespace: 'v2',

  namespace: null,

  init: function(){
    this.set('namespace', this.container.lookup('application:main'));
    return this._super.apply(this, arguments);
  },

  findQuery: function(store, type, query) {
    // this is overridden here so we can receive the query in buildURL
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
      Em.$.proxy(this.ajaxFailure, this)
    );
  },

  ajaxFailure: function(error){
    var message;

    if (Em.typeOf(error) === 'object' && (!!error.statusText || !!error.status)){
      message = '%@ %@'.fmt(error.statusText, error.status);
    } else if (!!error.message) {
      message = error.message;
    } else {
      message = error;
    }

    Em.debug('Failed with %@'.fmt(message));

    return error.detail;
  },

  ajaxOptions: function(url, type, hash){
    hash = this._super(url, type, hash);

    hash.dataType = 'jsonp';

    return hash;
  },

  buildURL: function(type, query){
    'use strict';
    var url = [],
        host = this.get('api_host'),
        namespace = this.get('api_namespace'),
        blog_name = query.blog_name;
    delete query.blog_name;

    // both types of url start with the host and namespace
    url.push(host, namespace);

    if (!blog_name){
      // the currently authenticated users dashboard
      url.push('user/dashboard');

    } else {
      // whichever single blog is currently selected
      url.push(
        'blog', blog_name + '.tumblr.com',
        'posts', this.pathForType(type)
      );
    }

    // filter out falsy segments
    url = url.filter(function(x){ return !!x; });
    url = url.join('/');

    return url;
  },

  pathForType: function(type){
    // simple posts are accessable at the root url,
    // everything else is as per normal Ember Data
    // convention

    if (type == 'post'){
      return '';
    } else {
      return this._super(type);
    }
  }
});
