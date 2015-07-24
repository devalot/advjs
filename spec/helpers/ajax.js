/******************************************************************************/
// Mock out XMLHttpRequest.
XMLHttpRequest = function() {
  this.openCalled     = false;
  this.srhCalled      = false;
  this.successHandler = null;
  this.errorHandler   = null;
};

/******************************************************************************/
// Create a way to manipulate the XMLHttpRequest instance.
//
XMLHttpRequest.withResponse = function(callback) {
  XMLHttpRequest.fakeResponse = {};
  callback(XMLHttpRequest.fakeResponse);
  XMLHttpRequest.fakeResponse = null;
};

/******************************************************************************/
// Instance methods.
XMLHttpRequest.prototype = {

  // Record the XHR callback.
  addEventListener: function(name, callback) {
    if (this.openCalled) {
      throw "you shouldn't call addEventListener *after* open, call open last!";
    }

    switch (name) {
    case "load":
      this.successHandler = callback;
      break;

    case "error":
      this.errorHandler = callback;
      break;

    case "progress":
      break;

    case "abort":
      break;

    default:
      throw ("invalid event registered for XHR: " + name);
    }
  },

  // Default response status.
  status: 200,

  // Default response text.
  responseText: "{}",

  // Fake `open' function.
  open: function(method, url) {
    this.openCalled = true;
    this.requestMethod = method;
    this.requestURL    = url;
  },

  // Fake `setRequestHeader' function.
  setRequestHeader: function() {
    if (!this.openCalled) throw "setRequestHeader called before open!";
    this.srhCalled = true;
  },

  // The send function pretends that the server responded immediately
  // and fires off the callbacks.
  send: function() {
    if (!this.openCalled) throw "Whoa: the XHR.open method was never called!";
    if (!this.srhCalled)  throw "Whoa: the XHR.setRequestHeader method was never called!";

    if (XMLHttpRequest.fakeResponse) {
      for (var p in XMLHttpRequest.fakeResponse) {
        if (XMLHttpRequest.fakeResponse.hasOwnProperty(p)) {
          this[p] = XMLHttpRequest.fakeResponse[p];
        }
      }

      // Copy some important data back.
      XMLHttpRequest.fakeResponse.requestMethod = this.requestMethod;
      XMLHttpRequest.fakeResponse.requestURL    = this.requestURL;
    }

    if (this.status && this.successHandler) {
      // Success with fake event object.
      this.successHandler({});
    } else if (this.errorHandler) {
      // Error with fake event object.
      this.errorHandler({});
    }
  },
};
