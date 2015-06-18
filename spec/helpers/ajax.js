/******************************************************************************/
// Mock out XMLHttpRequest.
XMLHttpRequest = function() {
  this.callback = null;
};

XMLHttpRequest.prototype = {
  addEventListener: function(name, callback) {
    this.callback = callback;
  },

  status: 200,

  responseText: "{}",

  open: function() {
  },

  send: function() {
    if (this.callback) {
      this.callback({});
    }
  },
};
