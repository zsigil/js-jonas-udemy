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

//STYLES --will be inline styles!!!
message.style.backgroundColor = "#37383d"; //camelCase
message.style.width = "120%";

console.log(message.style.color); //won't display anything,because it is not an inline style
console.log(getComputedStyle(message).color); //result will be STRING

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + "px";

//css custom properties(variables)
// :root {} in css
document.documentElement.style.setProperty("--color-primary", "orangered");

//attributes
const logo = document.querySelector("#logo");
console.log(logo.alt);
console.log(logo.className);

logo.alt = "Beautiful image";
console.log(logo.alt);

console.log(logo.designer); // won't work like this, not standard attribute
console.log(logo.getAttribute("designer"));
console.log(logo.src); //absolute path
console.log(logo.getAttribute("src")); //relative path
logo.setAttribute("company", "Bankist");

//data attributes - start with data-
console.log(logo.dataset.versionNumber);

//classes
logo.classList.add("mylogo", "mylogo2");
logo.classList.remove("mylogo");
logo.classList.toggle("mylogo");
console.log(logo.classList.contains("mylogo"));

//SCROLL
const btnScrollto = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollto.addEventListener("click", (e) => {
  //get coordinates for section 1
  const s1coords = section1.getBoundingClientRect();
  console.log("S1 coords:", s1coords); //relative to the viewport
  console.log(e.target.getBoundingClientRect());
  console.log("Current scroll, X/Y:", window.pageXOffset, window.pageYOffset);
  console.log(
    "Height/width viewport:",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // ); //absolute, measured from top of page

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({ behavior: "smooth", block: "start" });
});

const h1 = document.querySelector("h1");

const alertH1 = (e) => {
  alert("addeventlistener");
};

h1.addEventListener("mouseenter", alertH1); //better, can be removed

// h1.onmouseenter = (e) => {
//   alert("onmouseenter");
// }; // old way

setTimeout(() => {
  h1.removeEventListener("mouseenter", alertH1);
}, 10000);
