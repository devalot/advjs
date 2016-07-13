Album = Model.create({
  path: function(artist) {
    return "artists/" + artist.id + "/albums";
  },

  constructor: function(artist) {
    this.artist = artist;
  },
});
