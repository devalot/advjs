ArtistsController = (function(){

  // Very simple router:
  window.addEventListener("hashchange", function() {
    var id = location.hash.match(/(\d+)$/)[1];
    if (id) ArtistsController.show(id);
  });

  // Display all artists.
  var index = function() {
    Artist.fetchAll().then(function(artists) {
      View.set('artists-index', {artists: artists});
    });
  };

  // Display a single artist.
  var show = function(id) {
    Artist.fetchOne(id).then(function(artist) {
      View.set('artists-show', artist);
    });
  };

  // Display a form for creating a new artist.
  var form = function() {
  };

  // Taking values from a form, create a new artist.
  var create = function() {
  };

  // Public interface:
  return {
    index:  index,
    show:   show,
    form:   form,
    create: create,
  };
})();
