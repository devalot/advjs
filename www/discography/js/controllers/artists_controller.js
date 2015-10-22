ArtistsController = (function(){

  var setView = function(id, object) {
    var view = document.getElementById("view");
    var tmpl = View.get(id);
    view.innerHTML = View.render(tmpl, object);
  };

  // Display all artists.
  var index = function() {
    Artist.fetchAll(function(artists) {
      var templateObject = {artists: artists};
      setView("artists-view", templateObject);
    });
  };

  // Display a single artist.
  var show = function(id) {
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
