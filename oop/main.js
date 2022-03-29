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
