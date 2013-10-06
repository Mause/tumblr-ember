App.Video = App.Post.extend({
  caption: DS.attr('string'),
  player: DS.attr('raw'),

  video: function(){
    return this.get('player').objectAt(0);
  }.property('player')
});
