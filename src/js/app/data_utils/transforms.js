App.RawTransform = DS.Transform.extend({
  deserialize: function(serialized) {
    return serialized;
  },
  serialize: function(deserialized) {
    return deserialized;
  }
});

App.ArrayTransform = App.RawTransform.extend({});
App.TimestampTransform = DS.NumberTransform.extend({});
App.ChoiceTransform = DS.StringTransform.extend();

App.TumblrStringTransform = DS.StringTransform.extend({
  deserialize: function(serialized){
    'use strict';
    var deserialized = this._super(serialized),
        self = this, url;

    // return if null
    if (Ember.isNone(deserialized))
      return null;

    // reformat tumblr urls appropriately
    return deserialized.replace(/http:\/\/([^\.]*.tumblr.com)/g, function(orig, s){
        url = /([^\.]*).*/g.exec(s);

        return Em.isNone(url) ? s : '/#/blog/%@'.fmt(url[1]);
    });
  }
});
