/******************************************************************************/
// Mock out XMLHttpRequest.
XMLHttpRequest = function() {
  this.callback = null;
};

XMLHttpRequest.fakeResponse = null;

XMLHttpRequest.prototype = {
  addEventListener: function(name, callback) {
    this.callback = callback;
  },

  status: 200,

  responseText: "{}",

  open: function() {
  },

  setRequestHeader: function() {
  },

  send: function() {
    if (this.callback) {
      if (XMLHttpRequest.fakeResponse) {
        this.responseText = XMLHttpRequest.fakeResponse;
      }

      this.callback({});
      XMLHttpRequest.fakeResponse = null;
    }
  },
};
