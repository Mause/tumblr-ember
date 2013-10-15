App.Audio = App.Post.extend({
  caption: DS.attr('string'),
  player: DS.attr('string'),
  plays: DS.attr('number'),
  album_art: DS.attr('string'),
  artist: DS.attr('string'),
  album: DS.attr('string'),
  track_name: DS.attr('string'),
  track_number: DS.attr('number'),
  year: DS.attr('number'),
});
