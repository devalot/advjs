Album = function(artist, fields) {
  Model.call(this, "artists/" + artist.id + "/albums", fields);
  this.artist = artist;
};

Album.factory = function(artist, record) {
  return new Album(artist, record);
};

// fetchOne :: Artist -> AlbumID -> Promise Album
Album.fetchOne = function(artist, id) {
  var path = "artists/" + artist.id + "/albums";
  var factory = Album.factory.bind(null, artist);
  return Model.fetchOne(path, factory, id);
};

// Model.fetchAll :: Path   -> (Object -> Instance) -> Promise [Instance]
// Album.fetchAll :: Artist ->                         Promise [Albums]
Album.fetchAll = function(artist) {
  var path    = "artists/" + artist.id + "/albums";
  var factory = Album.factory.bind(null, artist);
  return Model.fetchAll(path, factory);
};

Album.prototype = Model.prototype;
