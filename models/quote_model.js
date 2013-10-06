App.Quote = App.Post.extend({
  source: DS.attr('string'),
  source_url: DS.attr('string'),
  text: DS.attr('string'),
  source_title: DS.attr('string'),
});
