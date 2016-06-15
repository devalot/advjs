Album = function(artist, record) {
  Model.call(this, Album.pathPrefixFor(artist));
  this.setProperties(record);
};

Album.pathPrefixFor = function(artist) {
  return "/api/artists/" + artist.id + "/albums";
};

Album.prototype = Object.create(Model.prototype);

// There's a bug hiding below when using `bind'.  Can you see it?

Album.fetchOne = function(artist, id) {
  return Model.fetchOne.
    call(Album.bind(this, artist), Album.pathPrefixFor(artist), id);
};

Album.fetchAll = function(artist) {
  return Model.fetchAll.
    call(Album.bind(this, artist), Album.pathPrefixFor(artist));
};
