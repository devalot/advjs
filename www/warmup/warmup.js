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

  var HeaderHistory = function(document, header) {
    this.document = document;
    this.element = header;
    this.history = document.getElementById("history");
    var self = this;

    this.history.addEventListener("click", function(event) {
      self.pop(event.target);
    });
  };

  HeaderHistory.prototype.set = function(text) {
    this.push(this.element.textContent);
    this.element.textContent = text;
  };

  HeaderHistory.prototype.push = function(text) {
    var li = this.document.createElement("li");
    li.textContent = text;
    this.history.appendChild(li);
  };

  HeaderHistory.prototype.pop = function(node) {
    this.set(node.textContent);
    this.history.removeChild(node);
  };

  var header = document.querySelector("h1");
  var form   = document.querySelector("form");
  var input  = document.getElementById("new-text");
  var history = new HeaderHistory(document, header);

  form.addEventListener("submit", function(event) {
    if (input.value.trim().length) {
      history.set(input.value.trim());
      input.value = "";
    }

    event.preventDefault();
  });
})();
