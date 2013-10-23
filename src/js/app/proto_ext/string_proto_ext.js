App.utils = {
  _mend_url: function(url) {
    var router = App.__container__.lookup('router:main'),
        parsed_url = /http:\/\/([^\.]*).tumblr.com(?:\/post\/(\d+)\/?([a-z0-9\-]*))?/g.exec(url);

    if (!parsed_url) return url;

    return router.generate(Em.isEmpty(parsed_url[[2]]) ? 'single_blog' : 'single_post', {
      blog_name: parsed_url[1],
      post_ident: parsed_url[2],
      post_slug: parsed_url[3]
    });
  },

  mend_hrefs: function(str){
    return str.replace(/href="([^"]*)"/g, function(orig, url){
      return 'href="%@"'.fmt(App.utils._mend_url(url));
    });
  }
};
