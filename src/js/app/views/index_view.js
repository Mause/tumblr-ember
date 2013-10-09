App.IndexView = Ember.View.extend(App.Scrolling, {
  didInsertElement: function() {
    this.bindScrolling();

  },
  willRemoveElement: function() {
    this.unbindScrolling();
  }
});
