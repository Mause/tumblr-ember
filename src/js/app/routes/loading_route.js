App.LoadingRoute = Em.Route.extend({
  templateName: 'loading_route',

  renderTemplate: function() {
    // have it always render into the application template
    this.render('loading', {
      outlet: 'main'
    });
  }
});
