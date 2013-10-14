App.SubPhoto = DS.Model.extend({
  caption: DS.attr('string'),

  // original_size: DS.belongsTo('sub_photo_instance'),
  alt_sizes: DS.hasMany('sub_photo_instance', {embedded: true}),

  original_size: DS.belongsTo('sub_photo_instance', {embedded: true}),

  // original_size: function(){
  //   return this.get('alt_sizes').objectAt(0);
  // }.property('alt_sizes.@each'),

  smallest: function(){
    var sizes_map = {};

    this.get('alt_sizes').forEach(function(size){
      var square = size.get('width') * size.get('height');
      sizes_map[square] = size;
    });

    var smallest_square = Ember.keys(sizes_map);
    smallest_square = smallest_square.toInts();
    smallest_square = Math.min.apply(this, smallest_square);

    return sizes_map[smallest_square];
  }.property('alt_sizes'),

  all_sizes: function(){
    var sizes = {},
        alt_sizes = this.get('alt_sizes');

    alt_sizes.forEach(function(item, idx){
      sizes[idx] = item;
    });

    return sizes;
  }.property('alt_sizes'),

  display_size: function(){
    // here we determine the best image size to display... it is difficult
  },

  type: 'sub_photo'
});
