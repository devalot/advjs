/******************************************************************************/
require("../../www/discography/js/lib/promise.js");
require("../../www/discography/js/lib/ajax.js");

/******************************************************************************/
// Spy on the Ajax library, stubbing out one of its methods.
ajaxSpy = function(method, result) {
  spyOn(Ajax, method).and.callFake(function() {
    return new Promise(function(resolve, reject) {
      if (result && typeof result === "object") {
        resolve(result);
      } else {
        reject(result);
      }
    });
  });
};
