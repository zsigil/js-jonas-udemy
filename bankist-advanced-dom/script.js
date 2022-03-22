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

//LEARN MORE SCROLL BUTTON
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

//PAGE NAVIGATION

//bad version - performance issues!!

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document
//       .querySelector(id)
//       .scrollIntoView({ behavior: "smooth", block: "start" });
//   });
// });

//good version with event delegation - event listener on common parent

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  const id = e.target.getAttribute("href");

  if (e.target.classList.contains("nav__link"))
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });

  // if (id) document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

//TABBED COMPONENT
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  //we need to get the button element (not the span inside)
  const clicked = e.target.closest(".operations__tab");

  //guard clause
  if (!clicked) return;

  //active tab
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  //activate content
  tabsContent.forEach((cont) =>
    cont.classList.remove("operations__content--active")
  );
  const content = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );
  content.classList.add("operations__content--active");
});

//MENU fade animation
const nav = document.querySelector(".nav");

const linkHoverHandler = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el != link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
//passing arguments to event handlers
nav.addEventListener("mouseover", linkHoverHandler.bind(0.5)); //mouseenter does NOT bubble
//or
nav.addEventListener("mouseout", linkHoverHandler.bind(1));

//sticky navigation - scroll event

const { top: section1Top } = section1.getBoundingClientRect();
console.log(section1Top);

//listening to scroll event is bad practice, performance issues!!!!
// window.addEventListener("scroll", () => {
//   console.log(window.scrollY); // depends on viewport!
//   if (window.scrollY > section1Top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

//intersection observer API

// const obsCallback = (entries, observer) => {
//   console.log(entries);
// };

//target (section1) intersects the viewport with 10%:

// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// make navigation sticky,when header moves out completely
const { height: navHeight } = nav.getBoundingClientRect();
console.log(navHeight);

const stickyNav = (entries, observer) => {
  if (!entries[0].isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const headerObsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(stickyNav, headerObsOptions);
headerObserver.observe(header);

//DOM traversing
const h1 = document.querySelector("h1");

//going downwards : child/children
console.log(h1.querySelectorAll(".highlight")); //deepness does not matter
console.log(h1.childNodes); // all direct childnodes - text,comment,elements
console.log(h1.children); // all direct children html elements, LIVE collection!
console.log(h1.firstChild);
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "orangered";

//going upwards : parents
console.log(h1.parentNode); //direct
console.log(h1.parentElement); //direct
console.log(h1.closest(".header"));

//going sideways -- direct siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.parentElement.children); //all siblings

//all siblings except for original element
[...h1.parentElement.children].forEach((el) => {
  if (el != h1) {
    //el.style.transform = "scale(0.5)";
  }
});

// const h1 = document.querySelector("h1");

// const alertH1 = (e) => {
//   alert("addeventlistener");
// };

// h1.addEventListener("mouseenter", alertH1); //better, can be removed

// // h1.onmouseenter = (e) => {
// //   alert("onmouseenter");
// // }; // old way

// setTimeout(() => {
//   h1.removeEventListener("mouseenter", alertH1);
// }, 10000);

// //rgb(255,255,255)

// const randomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const randomColor = () => {
//   return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// };

// // arrow functions won't give you 'this'

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("LINK", e.target);
//   console.log(this === e.currentTarget); //true

//   //stop propagation - usually not a good idea
//   // e.stopPropagation();
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("LINKS", e.target, e.currentTarget); //e.target is the link itself!!!
// });

// document.querySelector(".nav").addEventListener(
//   "click",
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log("NAV", e.target, e.currentTarget); //e.target is the link itself!!!
//   },
//   //true //listening in capturing phase (backwards!!!),
//   false
// );
