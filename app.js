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

var App = Ember.Application.create({
  title: 'Ball Table Select',
  author: 'Dominic May (http://mause.me)',
  // LOG_TRANSITIONS: true,
  // LOG_ACTIVE_GENERATION: true,
  // LOG_TRANSITIONS_INTERNAL: true,
  // LOG_VIEW_LOOKUPS: true,
  rootElement: 'body'
});

Array.prototype.sortBy = function(key){
  var get = Ember.get;

  return this.sort(function(a, b){
    return get(a, key) > get(b, key);
  });
};
