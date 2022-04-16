"use strict";

//arrow function won't work
const Person = function (firstName, birthYear) {
  //instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //! never create a method inside a constructor function like this
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const jonas = new Person("Jonas", 1991);
const matilda = new Person("Matilda", 2017);

console.log(jonas instanceof Person); //true

//PROTOTYPES
console.log(Person.prototype === jonas.__proto__); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false!!!

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

Person.prototype.species = "homo sapiens"; //jonas.species --common property!!
console.log(jonas.hasOwnProperty("species")); //false
console.log(jonas.__proto__); //Person.prototype
console.log(jonas.__proto__.__proto__); //Object.prototype
console.log(jonas.__proto__.__proto__.__proto__); //null

//static method
Person.hey = function () {
  console.log("hey there");
};

const arr = [2, 5, 8, 3, 1, 2, 2];

//DO NOT DO THIS
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car("bmw", 120);
const mercedes = new Car("mercedes", 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();

//ES6 Classes

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //methods will be added to .prototype property = instance methods, they will be inherited
  calcAge() {
    return 2021 - this.birthYear;
  }
  //getter
  get age() {
    return 2021 - this.birthYear;
  }

  //for fullname validation, we need a setter and a getter
  set fullName(name) {
    console.log(name);
    if (name.includes(" ")) {
      this._fullName = name; // underscore is needed (convention), we need another variable
    } else alert("not full name");
  }

  get fullName() {
    return this._fullName; //now we got rid of underscore
  }

  //STATIC METHOD
  static hey() {
    console.log("I am a static method");
  }
}

const jessica = new PersonCl("Jessica Brown", 1990);

//this will also work
PersonCl.prototype.greet = function () {
  console.log(`hey, I am ${this.fullName}`);
};

// 1. Classes are not hoisted
// 2. classes are first -class citizens
// 3. the body of a class is always executed in strict mode

const account = {
  owner: "Jonas",
  movements: [200, -150, 230, 500],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(movement) {
    this.movements.push(movement);
  },
};
//use it as a property
account.latest = 50;
console.log(account.latest);

//Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  //function name does not matter
  initFunction(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steve = Object.create(PersonProto);
steve.name = "Steven Boss";
steve.birthYear = 1956;
steve.calcAge();

const sarah = Object.create(PersonProto);
sarah.initFunction("Sarah Johns", 1987);
sarah.calcAge();
console.log(sarah);

// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.
DATA CAR 1: 'Ford' going at 120 km/h
GOOD LUCK 😀
*/

class CarClass {
  constructor(make, speed) {
    this.speed = speed;
    this.make = make;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(milesPerHour) {
    this.speed = milesPerHour * 1.6;
  }
}

const trabant = new CarClass("Trabant", 20);

//Inheritance between classes - constructor functions
const PersonParent = function (firstName, birthYear) {
  //instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonParent.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  PersonParent.call(this, firstName, birthYear); //this way, we have 'this'
  this.course = course;
};

//!LINKING PROTOTYPES
// we need this connection here, otherwise we do not inherit methods
Student.prototype = Object.create(PersonParent.prototype); //not exactly the same object, but we inherit from it
Student.prototype.constructor = Student;

const mike = new Student("Mike", 2010, "computer science");
console.log(mike);

Student.prototype.introduce = function () {
  console.log(`Hi, my name is ${this.firstName}, and I study ${this.course}`);
};
mike.introduce();
mike.calcAge();

// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉
DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%
GOOD LUCK 😀
*/

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV("Tesla", 120, 23);

//Inheritance between ES6 classes
class StudentCl extends PersonCl {
  // if we do not have other properties, constructor is not even necessary
  constructor(fullName, birthYear, course) {
    //needs to happen first
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`Hi, my name is ${this.fullName}, and I study ${this.course}`);
  }

  //overwriting calcAge method
  calcAge() {
    console.log("I am old");
  }
}

const martha = new StudentCl("Martha Locky", 1995, "computer science");

//Another class example

//public fields
//private fields
//public methods
//private methods
//+ static versions

class Account {
  //public fields (instances)
  locale = navigator.language;

  //private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = []; //simulating privacy by convention = protected, still can be manipulated!
    // this.locale = navigator.language;
  }

  //private methods
  #approveLoan(val) {
    return true;
  }

  //PUBLIC INTERFACE
  //public methods

  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan) {
      this.deposit(val);
      console.log("Loan approved");
      return this;
    }
  }
}

const account1 = new Account("Jonas", "EUR", 1234);
console.log(account1);

//bad practice, use methods to interact with these properties!!!
// account1.movements.push(250);
// account1.movements.push(-140);

account1.deposit(300);
account1.withdraw(80);
account1.requestLoan(1000);
console.log(account1);

//chaining methods
account1.deposit(300).deposit(100).withdraw(20).requestLoan(1000);
