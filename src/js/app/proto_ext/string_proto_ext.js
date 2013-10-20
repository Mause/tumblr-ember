App.utils = {
  _mend_url: function(url) {
    var router = App.lk('router:main'),
        parsed_url = App.utils._url_regex.exec(url);

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
  },

  _url_regex: /http:\/\/([^\.]*).tumblr.com(?:\/post\/(\d+)\/?(.*))?/g
};

Em.String.mend_urls = String.prototype.mend_urls = App.utils.mend_urls;
