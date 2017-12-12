/******************************************************************************/
require("../../www/discography/js/lib/promise.js");
require("../../www/discography/js/lib/ajax.js");

/******************************************************************************/
// Spy on the Ajax library, stubbing out one of its methods.
ajaxSpy = function(method, result, error) {
  spyOn(Ajax, method).and.callFake(function() {
    return new Promise(function(resolve, reject) {
      if (error === undefined) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
