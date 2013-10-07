App.Photo = App.Post.extend({
  photos: DS.hasMany('sub_photo', {embedded: 'always'}),
  caption: DS.attr('string'),
});

App.SubPhoto = DS.Model.extend({
  caption: DS.attr('string'),

  // original_size: DS.belongsTo('sub_photo_instance'),
  alt_sizes: DS.hasMany('sub_photo_instance'),

  original_size: function(){
    return this.get('alt_sizes').objectAt(0);
  }.property('alt_sizes.@each'),

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
  }
});

// {
//   'tiny': [120, 80],
//   'extra_small': [200, 133],
//   'small': [300, 200],
//   'medium': [400, 266],
//   'default': [600, 400],
//   'large': [636, 424],
//   'extra_large': [798, 532]
// }

App.SubPhotoInstance = DS.Model.extend({
  width: DS.attr('number'),
  height: DS.attr('number'),
  url: DS.attr('string')
});

// Ember.Inflector.inflector.uncountable('photo');
