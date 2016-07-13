ArtistsController = (function(){

  // Display all artists.
  var index = function() {
    Artist.fetchAll().then(function(artists) {
      View.set("artists-index", {artists: artists});

      var table = document.getElementById("artists");
      table.addEventListener("click", function(e) {
        if (e.target.classList.contains("artist-name")) {
          var tr = e.target.parentNode;
          while (tr.tagName !== "TR") tr = tr.parentNode;
          show(tr.getAttribute("data-artist-id"));
        }
      });
    });
  };

  // Display a single artist.
  var show = function(id) {
    Artist.fetchOne(id).then(function(artist) {
      Album.fetchAll(artist).then(function(albums) {
        artist.albums = albums;
        View.set("artists-show", artist);
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
