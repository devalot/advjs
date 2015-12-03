(function(){

  /*
   * Use Case:
   *
   * 1. User clicks on the "Change" button.
   *
   * 2. If the text input is blank then nothing changes.
   *
   * 3. The contents of the H1 element are replaced with the contents
   *    of the text input.
   *
   * 4. The text input is cleared.
   *
   */

  // Add a `isBlank' method to all strings.
  //
  // Probably a bad idea to patch built-in objects.
  String.prototype.isBlank = function() {
    return this.length === 0 ||
      this.match(/^\s*$/);
  };

  var h1    = document.querySelector("h1"),
      form  = document.querySelector("form"),
      input = document.getElementById("new-text");

  form.addEventListener("submit", function(e) {
    if (!input.value.isBlank()) {
      h1.textContent = input.value;
      input.value = "";
    }

    e.preventDefault();
  });

})();
