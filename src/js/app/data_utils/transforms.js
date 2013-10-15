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
