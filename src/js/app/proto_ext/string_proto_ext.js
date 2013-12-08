App.utils = {
  _mend_url: function(url, blog_name) {
    'use strict';

    // if we are not supplied the name of the blog,
    // and we cannot infer the blog name from a .tumblr.com url,
    // just return the url unchanged
    if (!blog_name && url.indexOf('.tumblr.com') === -1) return url;

    // if the blog name is not supplied, try to infer it from the url
    if (!blog_name){
      blog_name = /http:\/\/([^\.]*).tumblr.com/.exec(url)[1];
      url = url.substring(blog_name.length + 18, url.length);
    }

    // if the blog name if supplied, it is in a situation where
    // the url is in tumblrs format, so we can just extract what we
    // need with a fairly simple regex
    var parsed_url = /\/post\/(\d+)\/?([a-z0-9\-]*)/g.exec(url) || [],
        router = App.__container__.lookup('router:main');
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
