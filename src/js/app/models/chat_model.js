App.Chat = DS.Model.extend(App.PostMixin, {
  title: DS.attr('string'),
  body: DS.attr('tumblr_string'),
  dialogue: DS.attr('array')
    // name – string: name of the speaker
    // label – string: label of the speaker
    // phrase – string: text
});
