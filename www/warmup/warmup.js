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

  var History = function() {
    this.h1 = document.querySelector("h1");
    this.form = document.querySelector("form");
    this.input = document.getElementById("new-text");
    this.ul = document.getElementById("history");
  };

  History.prototype.update = function() {
    if (this.input.value.length !== 0) {
      this.newHistoryItem(this.h1.textContent);
      this.h1.textContent = this.input.value;
      this.input.value = "";
    }
  };

  History.prototype.newHistoryItem = function(text) {
    var li = document.createElement("li");
    li.textContent = text;
    this.ul.appendChild(li);
  };

  var history = new History();

  history.form.addEventListener("submit", function(e) {
    e.preventDefault();
    history.update();
  });
})();
