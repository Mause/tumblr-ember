App.ApplicationController = Em.Controller.extend({
  metadata: null,
  needs: ['dashboard', 'single_post', 'single_blog'],

  init: function(){
    this.namespace.set('document_title', this.namespace.title);
  },

  show_load_new: function(){
    return this.get('currentRouteName') !== 'authenticate';
  }.property('currentRouteName'),

  metadata_watcher: function(){
    'use strict';
    var metadata = this.get('metadata'),
        title = this.namespace.title;

    if (!!metadata.title){ title += ' - %@'.fmt(metadata.title); }
    this.namespace.set('document_title', title);

  }.observes('metadata'),

  actions: {
    loadNew: function(){
      var controller = this.get('controllers').unknownProperty(this.currentRouteName);
      controller.send('loadNew');
    }
  }
});
