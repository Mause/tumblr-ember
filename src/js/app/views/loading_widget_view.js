App.LoadingWidgetView = Em.View.extend({
  template: Ember.Handlebars.compile('Loading{{view.ellipses}}'),
  ellipses: '',
  num_ellipses: 0,
  timeoutId: null,

  didInsertElement: function(){
    var id = setInterval(
      Em.$.proxy(this.tick, this),
      750
    );

    this.set('timeoutId', id);
  },

  tick: function(){
    if (this.get('isDestroyed') || this.get('isDestroying')){
      clearInterval(this.get('timeoutId'));
      return;
    }

    this.set('num_ellipses', (this.get('num_ellipses') + 1) % 4);

    var out = '';
    for (var i=0; i<this.get('num_ellipses'); i++){
      out += '.';
    }
    this.set('ellipses', out);
  },

  willRemoveElement: function(){
    debugger;
    if (!Em.isNone(this.get('timeoutId')))
      clearInterval(this.get('timeoutId'));
  }
});
