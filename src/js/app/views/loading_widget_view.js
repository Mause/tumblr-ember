App.LoadingWidgetView = Em.View.extend({
  template: Ember.Handlebars.compile('Loading{{view._ticker}}'),

  tickerChar: '.',
  tickerLength: 3,

  _ticker: '',

  didInsertElement: Em.aliasMethod('schedule'),
  schedule: function(){
    Ember.run.later(this,
      Em.$.proxy(this.tick, this),
      750
    );
  },

  tick: function(){
    if (this.get('isDestroyed') || this.get('isDestroying')){ return; }

    var _ticker = this.get('_ticker'),
        tickerLength = this.get('tickerLength'),
        tickerChar = this.get('tickerChar'),

        state = (_ticker.length + 1) % (tickerLength + 1),
        ticker = Array(state + 1).join(tickerChar);

    this.set('_ticker', ticker);
    this.schedule();
  },
});
