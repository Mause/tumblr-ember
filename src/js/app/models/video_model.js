App.Video = DS.Model.extend(App.PostMixin, {
  caption: DS.attr('tumblr_string'),
  player: DS.attr('raw'),

  video: function(){
    return this.get('player').objectAt(0);
  }.property('player')
});
