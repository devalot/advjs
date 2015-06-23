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

  var form  = document.getElementsByTagName("form")[0];
  var h1    = document.getElementsByTagName("h1")[0];
  var input = document.getElementById("new-text");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (input.value && input.value.length > 0) {
      h1.textContent = input.value;
      input.value = "";
    }
  });

})();
