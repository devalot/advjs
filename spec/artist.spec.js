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
    // Some test data:
    var record = {name: "The Wombats"};

    // Pretend the server responded with the above object:
    ajaxSpy('get', record);

    // Call into the Artist model:
    Artist.fetchOne(1).then(function(artist) {
      expect(artist.name).toEqual(record.name);
      expect(artist.save).toBeDefined();
      done(); // Make sure to call `done' last.
    }).catch(function() {
      done.fail("shouldn't have failed");
    });
  });

  it("fetchAll should provide an array of artists", function(done) {
    var records = [
      {name: "London Grammar"},
      {name: "M83"},
    ];

    ajaxSpy('get', records);

    Artist.fetchAll().then(function(artists) {
      expect(artists.length).toBe(records.length);
      expect(artists[0] instanceof Artist).toBeTruthy();
      done();
    }).catch(function(error) {
      done.fail(error);
    });
  });

  it("save should pick up an ID from the server", function(done) {
    var record = {name: "Phantogram", id: 42};
    var artist = new Artist({name: record.name});

    expect(artist.id).toBeUndefined();
    ajaxSpy('post', record);

    artist.save().then(function() {
      expect(artist.id).toBe(record.id);
      done();
    }).catch(function(error) {
      done.fail(error);
    });
  });
});
