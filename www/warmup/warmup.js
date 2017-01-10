(function(){

  /*
   * Use Case:
   *
   * 1. User clicks on the "Change" button.
   *
   * 2. If the text input is blank then nothing changes.
   *
   * 3. The contents of the <h1> element are replaced with the contents
   *    of the text input.
   *
   * 4. The text input is cleared.
   *
   * BONUS 1:
   *
   * Before step 3 above: Save the current text content of the <h1>
   * element by creating an <li> element.  Set the text content of the
   * <li> element to the text content of the <h1> element.  Find the
   * <ul> element with the ID of "history" and insert the new <li>
   * element as its first child.  Therefore, each time the <h1>
   * element is changed, its current value is prepended to the <ul>
   * element.
   *
   * BONUS 2:
   *
   * If one of the <li> elements inside the <ul> element from bonus 1
   * is clicked, update the text content of the <h1> element with the
   * text content of the clicked <li> element.
   */

  var UserHistory = function(document, h1Selector, histSelector) {
    var self = this;

    this.document = document;
    this.h1       = document.querySelector(h1Selector);
    this.element  = document.querySelector(histSelector);

    this.element.addEventListener("click", function(e) {
      if (e.target.tagName !== "LI") return;
      self.pop(e.target);
    });
  };

  // Insert text into the history list.
  UserHistory.prototype.insert = function(text) {
    var previous = this.h1.textContent;
    this.h1.textContent = text;

    var li = this.document.createElement("li");
    li.textContent = previous;
    this.element.appendChild(li);
  };

  // Pop a history item off the history list.
  UserHistory.prototype.pop = function(node) {
    this.insert(node.textContent);
    this.element.removeChild(node);
  };

  var form  = document.querySelector("form");
  var input = document.getElementById("new-text");
  var hist  = new UserHistory(document, "h1", "#history");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (input.value.match(/^\s*$/)) return;

    hist.insert(input.value);
    input.value = "";
  });

})();
