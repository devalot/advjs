$(function() {
  var ArtistsModel = Backbone.Model.extend({});

  var ArtistsCollection = Backbone.Collection.extend({
    model: ArtistsModel,
    url: "/api/artists",
  });

  var ArtistsItemView = Backbone.View.extend({
    tagName: "li",

    render: function() {
      var html = this.model.get('name').toString() +
          " (" + this.model.get('formation_year').toString() + ")";

      this.$el.html(html);
      return this;
    }
  });

  var ArtistsListView = Backbone.View.extend({
    el: "#artist-view",

    initialize: function() {
      this.listenTo(this.collection, 'sync', this.render);
    },

    render: function() {
      this.$el.empty();

      this.collection.each(function(artist) {
        var item = new ArtistsItemView({model: artist});
        this.$el.append(item.render().$el);
      }, this);

      return this;
    },
  });

  var artists = new ArtistsCollection();
  var view    = new ArtistsListView({collection: artists});
  artists.fetch();
});
