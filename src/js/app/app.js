Ember.RSVP.configure('onerror', function(e) {
  if (e.message != "TransitionAborted") {
    console.error(e);
    console.error(e.stack);
    debugger;
  }
});

Ember.RSVP.configure('async', function(func){
  var args = Array.prototype.slice.call(arguments, 1);
  return func.apply(this, args);
});

// these tend to spam :/
// Ember.LOG_BINDINGS = true;
// Ember.STRUCTURED_PROFILE = true;

Ember.LOG_VERSION = true;
Ember.LOG_STACKTRACE_ON_DEPRECATION = true;
Ember.DEBUG = true;

Ember.Application.reopen({
  init: function(){
    OAuth.initialize('0TnyjiS8p8uTFe23WCej3DMeAVQ');
    return this._super.apply(this, arguments);
  },

  document_title: function(keyName, value){
    Ember.run.once(function(){
      document.title = value;
    });
    return value;
  }.property(),
});


var App = Ember.Application.create({
  title: 'Tumblr Ember',
  author: 'Dominic May (http://mause.me)',
  // LOG_TRANSITIONS: true,
  // LOG_ACTIVE_GENERATION: true,
  // LOG_TRANSITIONS_INTERNAL: true,
  // LOG_VIEW_LOOKUPS: true,
  rootElement: 'body',
  API_KEY: 'a3yqP8KA1ztkIbq4hpokxEOwnUkleu2AMv0XsBWC0qLBKVL7pA',

  api_config: Ember.Object.create({
    offset: 0,
    limit: 5,

    next_offset: function(increment){
      var orig = this.get('offset');
      this.set('offset', offset + (increment || this.get('limit')));
      return orig;
    }
  }),

  lk: function(){ return App.__container__.lookup.apply(App.__container__, arguments); }
});


Em.aliasAction = function(actionName){
  var a_slice = Array.prototype.slice,
      predefined_args = [actionName].concat(a_slice.call(arguments, 1));

  return function(){
    var args = predefined_args.concat(a_slice.call(arguments));

    return this.send.apply(this, args);
  };
};
