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
  full_url_re: /href="http:\/\/([^\.]*).tumblr.com(?:\/post\/(\d+)\/?(.*))?"/g,

  deserialize: function(serialized){
    'use strict';
    var deserialized = this._super(serialized),
        router = this.container.lookup('router:main');

    // return if null
    if (Ember.isNone(deserialized))
      return null;

    // reformat tumblr urls appropriately
    return deserialized.replace(this.full_url_re, function(orig, blog_name, post_ident, post_slug){
      var url = router.generate(Em.isEmpty(post_ident) ? 'single_blog' : 'single_post', {
        blog_name: blog_name,
        post_ident: post_ident,
        post_slug: post_slug
      });
      return 'href="%@"'.fmt(url);
    });
  }
});
