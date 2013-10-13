App.DashboardView = Ember.View.extend(App.Scrolling, {
  templateName: 'post_stream',

  didInsertElement: function() {
    this.bindScrolling();
  },
  willRemoveElement: function() {
    this.unbindScrolling();
  }
});
