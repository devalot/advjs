Artist = Model.create({
  path: function(args, id) {
    var base = "/api/artists";
    return id ? (base + "/" + id) : base;
  },
});

Artist.prototype.getArtistName = function() {
  return this.name;
};
