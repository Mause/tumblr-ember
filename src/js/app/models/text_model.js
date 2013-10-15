App.Text = DS.Model.extend(App.PostMixin, {
  title: DS.attr('string'),
  body: DS.attr('string'),
});
