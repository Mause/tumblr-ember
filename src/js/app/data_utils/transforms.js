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
      if (!Em.isEmpty(path)){
        path = /post\/(\d+)\/(.*)?/.exec(path);


        var post_ident = path[1],
            post_slug = path[2];

        url = router.router.recognizer.generate('single_post', {
          blog_name: blog_name,
          post_id: post_ident,
          post_slug: post_slug
        });

      } else {
        url = router.router.recognizer.generate('single_blog', {blog_name: blog_name});
      }

      console.log('%@ -> %@'.fmt(orig.split('"')[1], url));

      url = router.get('location').formatURL(url);
      if (url.charAt(0) !== '/') { url = '/' + url; }

      return 'href="%@"'.fmt(url);
    });
  }
});
