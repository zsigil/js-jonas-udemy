"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal"); //nodelist!!

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// SELECTING, CREATING  AND DELETING ELEMENTS
console.log(window);

//SELECTING ELEMENTS
console.log(document.documentElement); //entire html
console.log(document.body); //no selector needed
console.log(document.head); //no selector needed

const header = document.querySelector(".header"); //first element matching
const allSections = document.querySelectorAll(".section"); //NodeList ;all elements matching

console.log(document.getElementById("section--1"));

// live HTML Collection;UPDATES automatically!
const allButtons = document.getElementsByTagName("button");

//live HTML collection
const btns = document.getElementsByClassName("btn");

//CREATING AND INSERTING ELEMENTS

//.insertAdjacentHTML
const message = document.createElement("div");
message.classList.add("cookie-message");
message.textContent =
  "We use cookies for improved functionalaty and analytics.";
message.innerHTML = `We use cookies for improved functionalaty and analytics.<button class="btn btn--close-cookie">Got it!</button>`;
// header.prepend(message);
header.append(message);
// message will only be presented ONCE! a DOM element is unique,can only exist at one place at a time!

// header.append(message.cloneNode(true)); // this way,it will be presented 2x

// header.before(message); //as sibling
// header.after(message); //as sibling

//DELETE ELEMENTS
document.querySelector(".btn--close-cookie").addEventListener("click", () => {
  message.remove(); // new method!!
  //old method:
  // message.parentElement.removeChild(message);
});
