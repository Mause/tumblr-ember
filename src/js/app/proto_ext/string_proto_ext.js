App.utils = {
  _mend_url: function(url, blog_name) {
    'use strict';
    var router = App.__container__.lookup('router:main'), parsed_url;

    if (!blog_name && url.indexOf('.tumblr.com') === -1) return;
    if (!blog_name){
      blog_name = /http:\/\/([^\.]*).tumblr.com/.exec(url)[1];
      url = url.substring(blog_name.length + 18, url.length);
    }

    parsed_url = /\/post\/(\d+)\/?([a-z0-9\-]*)/g.exec(url) || [];
    return router.generate(Em.isEmpty(parsed_url) ? 'single_blog' : 'single_post', {
      blog_name: blog_name,
      post_ident: parsed_url[1],
      post_slug: parsed_url[2]
    });
  },

  mend_hrefs: function(str){
    return str.replace(/href="([^"]*)"/g, function(orig, url){
      return 'href="%@"'.fmt(App.utils._mend_url(url));
    });
  }
};
