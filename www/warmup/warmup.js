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

  var form  = document.querySelector("form");
  var input = document.getElementById("new-text");
  var h1    = document.querySelector("h1");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (input.value.match(/^\s*$/)) return;

    h1.textContent = input.value;
    input.value = "";
  });

})();
