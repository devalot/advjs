Artist = function(record) {
  Model.call(this, "/api/artists");
  this.setProperties(record);
};

Artist.prototype = Object.create(Model.prototype);

Artist.fetchOne = Model.fetchOne.
  bind(Artist, "/api/artists");

Artist.fetchAll = Model.fetchAll.
  bind(Artist, "/api/artists");
