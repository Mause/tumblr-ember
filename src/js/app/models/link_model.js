App.Link = DS.Model.extend(App.PostMixin, {
  title: DS.attr('string'),
  url: DS.attr('string'),
  description: DS.attr('string')
});
