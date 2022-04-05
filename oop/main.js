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
