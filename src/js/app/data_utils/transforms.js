App.RawTransform = DS.Transform.extend({
  deserialize: function(serialized) {
    return serialized;
  },
  serialize: function(deserialized) {
    return deserialized;
  }
});

App.ArrayTransform = App.RawTransform.extend();
App.ChoiceTransform = DS.StringTransform.extend();

App.TimestampTransform = DS.DateTransform.extend({
  serialize: function(deserialized){
    debugger;
    return deserialized.getSeconds();
  },
  deserialize: function(serialized){
    return new Date(serialized * 1000);
  }
});

App.TumblrStringTransform = DS.StringTransform.extend({
  deserialize: function(serialized){
    'use strict';
    var deserialized = this._super(serialized);

    // return if null
    if (Ember.isNone(deserialized))
      return null;

    // reformat tumblr urls appropriately
    return App.utils.mend_hrefs(deserialized);
  }
});
