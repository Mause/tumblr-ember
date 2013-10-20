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
  serialize: function(){
    return serialized.getSeconds() / 1000;
  },
  deserialize: function(serialized){
    return new Date(serialized * 1000);
  }
});

App.TumblrStringTransform = DS.StringTransform.extend({
  full_url_re: /href="http:\/\/([^\.]*).tumblr.com\/?([^"]*)"/g,
  path_re: /post\/(\d+)\/?(.*)?/,

  deserialize: function(serialized){
    'use strict';
    var deserialized = this._super(serialized),
        self = this,
        router = this.container.lookup('router:main');

    // return if null
    if (Ember.isNone(deserialized))
      return null;

    // reformat tumblr urls appropriately
    return deserialized.replace(this.full_url_re, function(orig, blog_name, path){
      var split_path = self.path_re.exec(path) || {};

      var url = router.generate(Em.isEmpty(path) ? 'single_blog' : 'single_post', {
        blog_name: blog_name,
        post_ident: split_path[1] || '',
        post_slug: split_path[2] || ''
      });
      return 'href="%@"'.fmt(url);
    });
  }
});
