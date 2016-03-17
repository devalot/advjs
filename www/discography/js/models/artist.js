Artist = function(record) {Model.bind(this, "/api/artists", record);};
Artist.prototype = Model.prototype;
Artist.create = function(record) { return new Artist(record); };
Artist.fetchOne = Model.fetchOne.bind(Artist, "/api/artists");
Artist.fetchAll = Model.fetchAll.bind(Artist, "/api/artists");
