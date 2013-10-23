App.AuthenticateRoute = Em.Route.extend({
  beforeModel: function() {
    if (this.router.namespace.AuthManager.isAuthenticated()){
      this.transitionTo('dashboard');
    }
  }
});
