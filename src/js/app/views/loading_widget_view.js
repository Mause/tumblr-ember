App.LoadingWidgetView = Em.View.extend({
  template: Ember.Handlebars.compile('Loading{{view._ticker}}'),

  tickerChar: '.',
  tickerLength: 3,

  _ticker: '',
  _timeoutId: null,

  didInsertElement: function(){
    this.set('_timeoutId', setInterval(
      Em.$.proxy(this.tick, this),
      750
    ));
  },

  tick: function(){
    if (this.get('isDestroyed') || this.get('isDestroying')){
      return this.clear();
    }

    var state = (this.get('_ticker').length + 1) % (this.get('tickerLength') + 1),
        ticker = Array(state + 1).join(this.get('tickerChar'));

    this.set('_ticker', ticker);
  },

  willRemoveElement: Em.aliasMethod('clear'),

  clear: function(){
    if (!Em.isNone(this.get('_timeoutId')))
      return clearInterval(this.get('_timeoutId'));
  }
});
