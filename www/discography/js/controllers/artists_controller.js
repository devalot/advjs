ArtistsController = (function(){

  // Display all artists.
  var index = function() {
    Artist.fetchAll().
      then(function(artists) {
        View.set("artists", {artists: artists});

        var list = document.getElementById("artists-list");

        list.addEventListener("click", function(event) {
          event.preventDefault();
          var id = event.target.getAttribute("data-artist-id");
          if (id) show(id);
        });
      });
  };

  // Display a single artist.
  var show = function(id) {
    Artist.fetchOne(id).
      then(function(artist) {
        Album.fetchAll(artist).then(function(albums) {
          artist.albums = albums;
          View.set("artist", artist);
        });
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
