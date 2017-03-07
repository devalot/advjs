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

  var TitleHistory = function(h1) {
    this.header = h1;
    this.list   = document.getElementById("history");
  };

  TitleHistory.prototype.insert = function(text) {
    this.push(this.header.textContent);
    this.header.textContent = text;
  };

  TitleHistory.prototype.push = function(text) {
    var li = document.createElement("LI");
    li.textContent = text;
    this.list.appendChild(li);
  };

  var form    = document.querySelector("form");
  var h1      = document.querySelector("h1");
  var input   = document.getElementById("new-text");
  var history = new TitleHistory(h1);

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (input.value.match(/^\s*$/)) return;
    history.insert(input.value);
    input.value = "";
  });
})();
