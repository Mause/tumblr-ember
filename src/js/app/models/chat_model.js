App.Chat = App.Post.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  dialogue: DS.attr('array')
    // name – string: name of the speaker
    // label – string: label of the speaker
    // phrase – string: text
});
