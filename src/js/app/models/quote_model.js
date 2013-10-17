App.Quote = DS.Model.extend(App.PostMixin, {
  source: DS.attr('string'),
  source_url: DS.attr('tumblr_string'),
  text: DS.attr('string'),
  source_title: DS.attr('string'),
});
