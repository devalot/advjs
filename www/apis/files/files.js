FileTest = (function() {

  var view, input;

  var display = function() {
    var firstFile = input.files[0];
    if (!firstFile) return;

    var ul = document.createElement("ul");

    var name = document.createElement("li");
    name.textContent = firstFile.name.toString();
    ul.appendChild(name);

    var size = document.createElement("li");
    size.textContent = firstFile.size.toString();
    ul.appendChild(size);

    var type = document.createElement("li");
    type.textContent = firstFile.type.toString();
    ul.appendChild(type);

    view.appendChild(ul);
  };

  var go = function(viewID, inputID)  {
    view  = document.getElementById(viewID);
    input = document.getElementById(inputID);
    input.addEventListener("change", display);
  };

  return {go: go};
})();
