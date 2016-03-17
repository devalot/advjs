ArtistsController = (function(){

  // Display all artists.
  var index = function() {
    Artist.fetchAll().
      then(function(artists) {
        var viewObject = {
          artists: artists,
        };

        View.set("artists", viewObject);

        var table = document.getElementById("artists-table");

        table.addEventListener("click", function(e) {
          if (e.target.classList.contains("nameLink")) {
            var tr = e.target.parentNode;
            while (tr.tagName != 'TR') tr = tr.parentNode;
            show(tr.getAttribute("data-artist-id"));
          }
        });
      });
  };

  // Display a single artist.
  var show = function(id) {
    var artist;

    Artist.fetchOne(id).
      then(function(record) {
        artist = record;
        return Album.fetchAll(artist);
      }).
      then(function(albums) {
        artist.albums = albums;
        View.set("artistTemplate", artist);
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
