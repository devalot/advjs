require("../www/discography/js/lib/promise.js");

describe("Promise", function() {

  /****************************************************************************/
  it("should invoke success callbacks", function(done) {
    // Promise-A
    var p = new Promise(function(resolve, reject) {
      resolve(1);
    });

    // Promise-B
    p.then(function(data) {
      expect(data).toEqual(1);
      done(); // Must be the last thing called.
    });
  });

  /****************************************************************************/
  it("should invoke failure callbacks", function(done) {
    var p = new Promise(function(resolve, reject) {
      reject(2);
    });

    p.catch(function(data) {
      expect(data).toEqual(2);
      done(); // Must be the last thing called.
    });
  });

  /****************************************************************************/
  it("should do simple chaining", function(done) {
    // <<: chain
    // Taken from the `promise.spec.js' file.
    var p = new Promise(function(resolve, reject) {
      resolve(1);
    });

    p.then(function(val) {
      expect(val).toEqual(1);
      return 2;
    }).then(function(val) {
      expect(val).toEqual(2);
      done();
    });
    // :>>
  });

  /****************************************************************************/
  it("should chain resolved promises", function(done) {
    var work = function(done, fail) {
      // Do some work.
      done(1);
    };

    // Promise-A
    var p = new Promise(work);

    // Promise-B
    p.then(function(data) {
      expect(data).toEqual(1);

      // Promise-C
      return new Promise(function(resolve, reject) {
        resolve(2);
      });
    }).then(function(data) {
      expect(data).toEqual(2);
      done(); // Must be the last thing called.
    });
  });

  /****************************************************************************/
  it("should chain rejected promises", function(done) {
    var p = new Promise(function(resolve, reject) {
      resolve(1);
    });

    p.then(function(data) {
      expect(data).toEqual(1);

      return new Promise(function(resolve, reject) {
        reject(2);
      });
    }).catch(function(data) {
      expect(data).toEqual(2);
      done(); // Must be the last thing called.
    });
  });
});
