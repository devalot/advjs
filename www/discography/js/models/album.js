Album = Model.create({
  path: function(args, id) {
    var artist = args[0];
    if (!artist) throw "Album.fetchOne needs an artist!";

    var base = "/api/artists/" + artist.id + "/albums";
    return id ? (base + "/" + id) : base;
  },
});
