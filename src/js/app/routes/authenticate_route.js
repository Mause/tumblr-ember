App.AuthenticateRoute = Em.Route.extend({
  beforeModel: function() {
    if (this.router.get('isAuthenticated')){
      this.transitionTo('dashboard');
    }
  }
});
