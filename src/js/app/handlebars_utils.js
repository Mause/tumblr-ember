Ember.Handlebars.registerHelper('switch', function(options){
  var mapping = { photo: 'photoset' },
      attribute = options.hash['attr'],

      normalized = Ember.Handlebars.normalizePath(this, attribute, options.data),
      obj = normalized.root,
      attr_val = obj.get(normalized.path);

  Em.assert('The attribute must exist on the object', !!attr_val);
  attr_val = mapping[attr_val] || attr_val;

  Ember.Handlebars.helpers.partial.call(this, attr_val, options);
});
