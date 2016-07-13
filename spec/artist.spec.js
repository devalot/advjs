require("../www/discography/js/lib/model.js");
require("../www/discography/js/models/artist.js");
require("../www/discography/js/lib/ajax.js");
require("../www/discography/js/lib/promise.js");

/******************************************************************************/
//
// Jasmine Docs: https://jasmine.github.io/2.4/introduction.html
//
/******************************************************************************/

describe("Artist model interface", function() {
  it("fetchOne should provide one artist", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      var record = {name: "The Wombats"};
      response.responseText = JSON.stringify(record);

      Artist.fetchOne(1).then(function(artist) {
        expect(artist instanceof Artist).toBeTruthy();
        expect(artist.name).toBe(record.name);
        expect(artist.save).toBeDefined();
        done(); // Make sure to call `done' last.
      });
    });
  });

  it("fetchAll should return an array of artists", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      var records = [{name: "Prince"}, {name: "M83"}];
      response.responseText = JSON.stringify(records);

      Artist.fetchAll().then(function(artists) {
        expect(artists.length).toBe(2);
        expect(artists[0] instanceof Artist).toBeTruthy();
        expect(artists[0].name).toBe("Prince");
        done();
      });
    });
  });

  it("saving a record should get an ID", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      var record = {name: "Junior Boys", id: 42};
      response.responseText = JSON.stringify(record);

      var artist = new Artist({name: record.name});
      expect(artist.id).toBeUndefined();

      artist.save().then(function() {
        expect(response.requestMethod).toBe("POST");
        expect(artist.id).toBe(record.id);
        expect(artist.name).toBe(record.name);
        done();
      });
    });
  });
});
