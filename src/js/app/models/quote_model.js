App.Quote = DS.Model.extend(App.PostMixin, {
  source: DS.attr('string'),
  source_url: DS.attr('string'),
  text: DS.attr('string'),
  source_title: DS.attr('string'),
});
