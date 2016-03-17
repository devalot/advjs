Album = function(artist, record) {
  Model.bind(this, artist.getURL(artist.id, "albums"), record);
};

Album.prototype = Model.prototype;

Album.create = function(artist, record) {
  return new Album(artist, record);
};

Album.fetchOne = function(artist, albumID) {
  return Model.fetchOne(artist.getURL(artist.id, "albums", albumID));
};

Album.fetchAll = function(artist) {
  return Model.fetchAll(artist.getURL(artist.id, "albums"));
};
