Ember.Handlebars.registerHelper('switch', function(options){
  var mapping = { photo: 'photoset' },
      attribute = options.hash['attribute'],
      io = attribute.indexOf('.'),

      context = (options.contexts && options.contexts.length) ? options.contexts[0] : this,
      normalized = Ember.Handlebars.normalizePath(context, attribute, options.data),
      obj = normalized.root;

  Em.assert('You must provide both an obj and an attribute on that object', !!obj && !! attribute);
  Em.assert('The attribute path must contain a dot', io >= 0);
  Em.assert('The attribute must be on the object', attribute.substring(0, io) === options.hash['obj']);

  attribute = attribute.substring(io + 1, attribute.length);
  Em.assert('The attribute must exist on the object', !!obj.get(attribute));

  var attr_val = obj.get(attribute);
  attr_val = mapping[attr_val] || attr_val;

  Ember.Handlebars.helpers.partial.call(this, attr_val, options);
});
