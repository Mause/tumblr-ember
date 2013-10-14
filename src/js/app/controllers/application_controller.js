App.ApplicationController = Em.Controller.extend({
  metadata: null,

  init: function(){
    this.namespace.set('document_title', this.namespace.title);
  },

  metadata_watcher: function(){
    'use strict';
    var metadata = this.get('metadata'),
        title = this.namespace.title;

    if (!!metadata.title){ title += ' - %@'.fmt(metadata.title); }
    this.namespace.set('document_title', title);

  }.observes('metadata')
});
