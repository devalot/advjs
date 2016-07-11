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

  var h1      = document.querySelector("h1");
  var form    = document.querySelector("form");
  var input   = document.getElementById("new-text");
  var history = document.getElementById("history");

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // Don't go to google.com

    // Can you make this better?
    if (input.value.length === 0) return;

    // Add current value to history.
    var li = document.createElement("li");
    li.textContent = h1.textContent;
    history.insertBefore(li, history.firstChild);

    // Update current value from form.
    h1.textContent = input.value;
    input.value = "";
  });

  // Restore items from the history section.
  history.addEventListener("click", function(e) {
    if (e.target.tagName !== "LI") return;
    var text = e.target.textContent;
    e.target.textContent = h1.textContent;
    h1.textContent = text;
  });
})();
