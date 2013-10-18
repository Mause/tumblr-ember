App.Text = DS.Model.extend(App.PostMixin, {
  title: DS.attr('tumblr_string'),
  body: DS.attr('tumblr_string'),
});
