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
    var artist = {name: "The Wombats"};

    // Pretend the server responded with the above object:
    ajaxSpy('get', artist);

    // Call into the Artist model:
    Artist.fetchOne(1).then(function(record) {
      expect(record.name).toEqual(artist.name);
      expect(record.save).toBeDefined();
      done(); // Make sure to call `done' last.
    }).catch(function() {
      done.fail("shouldn't have failed");
    });
  });
});
