App = Ember.Application.create();

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.getJSON("/api/artists").then(function(data) {
      return data;
    });
  }
});

App.Router.map(function() {
  this.resource('artists');
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('artists');
  }
});
