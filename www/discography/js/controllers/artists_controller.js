ArtistsController = (function(){

  // Display all artists.
  var index = function() {
    Artist.fetchAll().
      then(function(artists) {
        View.set("artists-index", {
          artists: artists
        });

        var table = document.getElementById("artists-list");
        table.addEventListener("click", function(e) {
          if (!e.target.classList.contains("artist-name")) return;

          var row = e.target;
          while (row.tagName !== "TR") row = row.parentNode;

          var artistID = row.getAttribute("data-artist-id");
          if (artistID) show(artistID);
        });
      });
  };

  // Display a single artist.
  var show = function(id) {
    Artist.fetchOne(id).
      then(function(artist) {
        View.set("artists-show", artist);
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
