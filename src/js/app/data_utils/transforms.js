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
      var type, data;
      if (!Em.isEmpty(path)){
        path = /post\/(\d+)\/?(.*)?/.exec(path);
        var post_ident = path[1],
            post_slug = path[2];

          type = 'single_post';
          data = {
            blog_name: blog_name,
            post_ident: post_ident,
            post_slug: post_slug
          };
      } else {
        type = 'single_blog';
        data = {blog_name: blog_name};
      }

      url = router.generate(type, data);
      return 'href="%@"'.fmt(url);
    });
  }
});
