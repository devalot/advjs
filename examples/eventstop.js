var main = document.getElementById("main");

// <<: example
main.addEventListener("click", function(event) {
  event.stopPropagation();
  event.preventDefault();

  // ...
});
// :>>
