/******************************************************************************/
// <<: Base class.
class Person {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}

var peter = new Person("Peter");
peter.sayName();
// :>>

/******************************************************************************/
// <<: Derived class.
class Child extends Person {
  constructor(name) {
    super(name);
    this.minor = true;
  }

  isMinor() {
    return this.minor;
  }
}

var abi = new Child("Abi");
abi.sayName();
console.log(abi.isMinor());
// :>>

/******************************************************************************/
// <<: Class-static methods.
class Foo {
  static sayHello() {
    console.log("Hello from Foo");
  }
}

Foo.sayHello();
// :>>

/******************************************************************************/
// <<: Getters and setters.
class Car {
  constructor() {
    this._speed = 0;
  }

  get speed() {
    return this._speed;
  }

  set speed(x) {
    if (x > 100) throw "Slow the hell down";
    if (x < 0)   throw "Uh, what?";
    this._speed = x;
  }
}

var toyota = new Car();
toyota.speed = 99;
console.log(toyota.speed);
// :>>
