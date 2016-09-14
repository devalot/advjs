(function() {

  var users = [
    {id: 1, username: "caiva", age: 30},
    {id: 2, username: "ahxae", age: 17},
    {id: 3, username: "i4tie", age: 42},
    {id: 4, username: "bvu7F", age: 19},
  ];

  // Print out usernames.
  console.log(users.map(u => u.username));

  // Filter out minors.
  console.log(users.filter(u => u.age > 18));

  // Using forEach (and more than one argument):
  users.forEach((u, i) => {
    console.log(u.id, i);
  });

  function test () {
    var a = [1, 2, 3];

    a.map(e => {
      console.log(arguments, this);
      return e + 1;
    });
  }

})();
