App.Photo = DS.Model.extend(App.PostMixin, {
  photos: DS.hasMany('sub_photo', {embedded: true}),
  caption: DS.attr('tumblr_string'),
  photoset_layout: DS.attr('string'),

  widthString: function(){
    return "width: %@px;".fmt(this.get('width'));
  }.property('width'),

  width: function(){
    'use strict';
    var rows = this.get('rows'),
        lengths = rows.mapBy('length'),
        shortest_length = Math.min.apply(this, lengths),
        shortest_row;

    rows = rows.filterBy('length', shortest_length);
    shortest_row = rows.objectAt(0);

    Em.debug('The row with the least images is %@ images wide'.fmt(shortest_length));

    return shortest_row.mapBy('width').sum();
  }.property('rows'),

  sized_rows: function(){
    var rows = this.get('rows'),
        width = this.get('width');

    for (var i=0; i<rows.length; i++){
      var row = rows[i],
          cur_width = width / row.length;

      rows[i] = {
        width: cur_width,
        widthString: 'width: %@px;'.fmt(cur_width),
        content: row
      };
    }

    return rows;
  }.property('rows', 'width'),

  rows: function(){
    var photos = this.get('photos').mapBy('all_sizes.2'),
        photoset_layout = this.get('photoset_layout'),
        rows = [],
        cur_row,
        number_on_row;

    if (!photoset_layout){
      return [photos];
    }

    for (var i=0;i<photoset_layout.length; i++){
      // parse as base ten, damn js -.-
      number_on_row = parseInt(photoset_layout[i], 10);

      cur_row = [];
      for (var q=0; q<number_on_row; q++){
        cur_row.push(photos.pop());
      }
      rows.push(cur_row);
    }

    // they end being backwards somehow
    rows.reverse();

    return rows;
  }.property('photos', 'photoset_layout')
});
