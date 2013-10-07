App.ApplicationAdapter = DS.RESTAdapter.extend({
  // host: 'http://api.tumblr.com',
  // namespace: 'v2/blog/mause-me.tumblr.com/posts',
  namespace: 'posts',
  serializer: App.RESTSerializer,

  ajaxOptions: function(url, type, hash){
    this._super(url, type, hash);

    // hash.dataType = 'jsonp';

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
    return '';
  }
});
