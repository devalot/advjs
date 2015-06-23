require("../www/discography/js/lib/ajax.js");

describe("Ajax interface", function() {
  it("has a get method", function() {
    expect(Ajax.get).toBeDefined();
    // assert("not undefined", Ajax.get !== undefined);
  });

  it("get method should invoke callback", function(done) {
    XMLHttpRequest.fakeResponse = "[1]";

    Ajax.get("/api/artists", function(objects) {
      expect(objects).toBeDefined();
      expect(objects.length).toEqual(1);
      done(); // Tell Jasmine we were called.
    });
  });
});
