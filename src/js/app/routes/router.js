App.Router.reopen({
  // location: 'history',

  // init: function(){
  //     'use strict';
  //     this.namespace.AuthManager = AuthManager.create({namespace: this.namespace});
  //     return this._super.apply(this, arguments);
  // },

  // isAuthenticated: function() {
  //     'use strict';
  //     return this.namespace.AuthManager.isAuthenticated();
  // }.property('this.namespace.AuthManager.apiKey')
});

App.Router.map(function(){
  // no-auth-required resources
  this.resource('authenticate', {path: '/auth'});

  this.resource('single_blog', {path: '/blog/:blog_name'});
  this.resource('single_post', {path: '/blog/:blog_name/post/:post_ident/:post_slug'});

  // auth-required resources
  this.resource('dashboard', {path: '/'});
  this.resource('following');
});
