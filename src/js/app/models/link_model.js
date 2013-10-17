App.Link = DS.Model.extend(App.PostMixin, {
  title: DS.attr('string'),
  url: DS.attr('tumblr_string'),
  description: DS.attr('tumblr_string')
});
