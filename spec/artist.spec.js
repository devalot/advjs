require("../www/discography/js/models/artist.js");

describe("Artist model interface", function() {
  it("fetchOne should provide one artist", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      var artist = {name: "The Wombats"};
      response.responseText = JSON.stringify(artist);

      Artist.fetchOne(1, function(record) {
        expect(record.name).toEqual(artist.name);
        done(); // Make sure to call `done' last.
      });
    });
  });

  it("save picks up the new ID", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      var fromServer = {id: 4, name: "Foo Buggers"};
      response.responseText = JSON.stringify(fromServer);

      var artist = Artist.create({name: "Foo"});
      artist.save(function() {
        expect(response.requestMethod).toEqual("POST");
        expect(response.requestURL).toEqual("/api/artists");
        expect(artist.id).toEqual(fromServer.id);
        expect(artist.name).toEqual(fromServer.name);
        done();
      });
    });
  });

  it("destroy removes artist id", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      response.responseText = null;

      var artist = Artist.create({id: 1, name: "Foo"});

      artist.destroy(function() {
        expect(response.requestMethod).toEqual("DELETE");
        expect(response.requestURL).toEqual("/api/artists/1");
        expect(artist.id).toBeUndefined();
        done();
      });
    });
  });
});
