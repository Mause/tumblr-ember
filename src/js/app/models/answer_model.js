App.Answer = DS.Model.extend(App.PostMixin, {
  asking_name: DS.attr('string'),
  asking_url: DS.attr('tumblr_string'),
  question: DS.attr('tumblr_string'),
  answer: DS.attr('string')
});
