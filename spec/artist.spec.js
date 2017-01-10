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

  it("fetchAll should provide all artists", function(done) {
    var records = [
      {name: "Peter Bjorn and John"},
      {name: "David Bowie"},
    ];

    ajaxSpy('get', records);

    Artist.fetchAll().
      then(function(artists) {
        expect(artists.length).toBe(records.length);
        expect(artists[0].name).toBe(records[0].name);
        expect(artists.every(function(artist) {
          return artist instanceof Artist;
        })).toBeTruthy();
        done();
      }).
      catch(function() {
        done.fail("promise rejected");
      });
  });
});
