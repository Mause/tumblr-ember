Ember.RSVP.configure('onerror', function(e) {
  console.error(e);
  console.error(e.stack);
  debugger;
});

Ember.RSVP.configure('async', function(func){
  // debugger;
  var args = Array.prototype.slice.call(arguments, 1);
  return func.apply(this, args);
});

// these tend to spam :/
// Ember.LOG_BINDINGS = true;
// Ember.STRUCTURED_PROFILE = true;

Ember.LOG_VERSION = true;
Ember.ENV.RAISE_ON_DEPRECATION = true;
Ember.LOG_STACKTRACE_ON_DEPRECATION = true;
Ember.DEBUG = true;

Ember.Application.reopen({
  init: function(){
    OAuth.initialize('0TnyjiS8p8uTFe23WCej3DMeAVQ');
    return this._super.apply(this, arguments);
  }
});

var App = Ember.Application.create({
  title: 'Ball Table Select',
  author: 'Dominic May (http://mause.me)',
  // LOG_TRANSITIONS: true,
  // LOG_ACTIVE_GENERATION: true,
  // LOG_TRANSITIONS_INTERNAL: true,
  // LOG_VIEW_LOOKUPS: true,
  rootElement: 'body',

  customEvents: {
    scroll: 'scroll'
  },

  debounce: _.debounce,
  API_KEY: 'a3yqP8KA1ztkIbq4hpokxEOwnUkleu2AMv0XsBWC0qLBKVL7pA'
});


