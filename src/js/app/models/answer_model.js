App.Answer = DS.Model.extend(App.PostMixin, {
  asking_name: DS.attr('string'),
  asking_url: DS.attr('string'),
  question: DS.attr('string'),
  answer: DS.attr('string')
});
