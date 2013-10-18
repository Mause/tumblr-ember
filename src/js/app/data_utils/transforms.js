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
        self = this,
        router = this.container.lookup('router:main'), url;

    // return if null
    if (Ember.isNone(deserialized))
      return null;

    // reformat tumblr urls appropriately
    return deserialized.replace(/href="http:\/\/([^\.]*).tumblr.com\/([^"]*)"/g, function(orig, blog_name, path, idx, full){
      url = router.router.recognizer.generate('single_blog', {blog_name: blog_name});
      url = router.get('location').formatURL(url);

      if (url.charAt(0) !== '/') { url = '/' + url; }

      return 'href="%@"'.fmt(url);
    });
  }
});
