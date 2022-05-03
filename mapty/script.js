"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (pos) {
      const { latitude, longitude } = pos.coords;
      console.log(`https://www.google.hu/maps/@${latitude},${longitude}`);

      map = L.map("map").setView([latitude, longitude], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //handling clicks on map
      map.on("click", function (e) {
        mapEvent = e;
        //render form
        form.classList.remove("hidden");
        inputDistance.focus();
      });
    },
    function () {
      alert("Could not get your position");
    }
  );
}

//on form submit ('enter'), we display the marker
form.addEventListener("submit", function (e) {
  e.preventDefault();

  //clear input fields
  inputCadence.value =
    inputDistance.value =
    inputDuration.value =
    inputElevation.value =
      "";

  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup();

  const circle = L.circle([lat, lng], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.3,
    radius: 500,
  }).addTo(map);
});

inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
