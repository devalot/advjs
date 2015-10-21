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


  var form  = document.querySelectorAll("form")[0];
  var input = document.getElementById("new-text");
  var h1    = document.querySelectorAll("h1")[0];

  form.addEventListener("submit", function(event) {
    var text = input.value;

    if (text.length !== 0) {
      h1.textContent = text;
      input.value = "";
    }

    event.preventDefault();
  });

})();
