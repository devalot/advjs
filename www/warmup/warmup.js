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

  var ChangeLog = function(header, history) {
    this.header = header;
    this.history = history;
  };

  ChangeLog.prototype.update = function(text) {
    this.push(this.header.textContent);
    this.header.textContent = text;
  };

  ChangeLog.prototype.push = function(text) {
    var li = document.createElement("li");
    li.textContent = text;
    this.history.insertBefore(li, this.history.firstChild);
  };

  var log = new ChangeLog(document.querySelector("h1"),
                          document.getElementById("history"));

  var form = document.querySelector("form");
  var input = document.getElementById("new-text");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (input.value.match(/^\s*$/)) return;

    log.update(input.value);
    input.value = "";
  });
})();
