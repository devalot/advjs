require("../www/discography/js/lib/ajax.js");
require("../www/discography/js/lib/promise.js");

describe("Ajax interface", function() {
  it("has a get method", function() {
    expect(Ajax.get).toBeDefined();
  });

  /****************************************************************************/
  it("get method should resolve promise", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      response.responseText = JSON.stringify([1, 2, 3]);

      var promise = Ajax.get("/foo");
      expect(promise).toBeDefined();
      expect(promise.then).toBeDefined();

      promise.then(function(array) {
        expect(response.requestMethod).toEqual("GET");
        expect(response.requestURL).toEqual("/foo");
        expect(array.length).toEqual(3);

        // Tell Jasmine we were called.  MUST call the `done' function
        // *after* all expectations or the tests will silently pass :(
        done();
      }).catch(function() {
        done.fail("promise should have been resolved");
      });
    });
  });

  /****************************************************************************/
  it("should reject when status is not in 200 range", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      response.status = 199;

      var promise = Ajax.get("/foo");
      expect(promise).toBeDefined();
      expect(promise.then).toBeDefined();

      promise.then(function() {
        done.fail("when HTTP status is 199, promise should reject");
      }).catch(function() {
        done(); // Tell jasmine that our test is done.
      });
    });
  });

  /****************************************************************************/
  it("should reject when the `error' event fires", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      response.status = null; // Will trigger an `error' event.

      var promise = Ajax.get("/foo");
      expect(promise).toBeDefined();
      expect(promise.then).toBeDefined();

      promise.then(function() {
        done.fail("when `error' event fires the promise should reject");
      }).catch(function() {
        done(); // Tell jasmine that our test is done.
      });
    });
  });
});
