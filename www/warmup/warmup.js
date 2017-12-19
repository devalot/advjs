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

  let Header = function(header, history) {
    this.header = header;
    this.history = history;
  };

  Header.prototype.push = function(text) {
    let li = document.createElement("LI");
    li.textContent = text;
    this.history.appendChild(li);
  };

  Header.prototype.update = function(newText) {
    if (newText.match(/^\s*$/)) return;
    this.push(this.header.textContent);
    this.header.textContent = newText;
  };

  let h1 = document.querySelector("h1");
  let form = document.querySelector("form");
  let input = document.getElementById("new-text");
  let history = document.getElementById("history");

  let header = new Header(h1, history);

  form.addEventListener("submit", function(e) {
    header.update(input.value);
    input.value = "";
    e.preventDefault();
  });
})();
