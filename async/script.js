"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const getCountry = (country) => {
  const request = new XMLHttpRequest();
  request.open("get", `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    // console.log(data);

    const html = `        
        <article class="country">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.official}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} M</p>
            <p class="country__row"><span>🗣️</span>${
              data.languages[Object.keys(data.languages)[0]]
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[Object.keys(data.currencies)[0]].name
            }</p>
          </div>
        </article>`;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};

// getCountry("portugal");
// getCountry("usa");

const renderCountry = (data, className = "") => {
  const html = `        
        <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.official}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} M</p>
            <p class="country__row"><span>🗣️</span>${
              data.languages[Object.keys(data.languages)[0]]
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[Object.keys(data.currencies)[0]].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = (country) => {
  //ajax call country 1
  const request = new XMLHttpRequest();
  request.open("get", `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    // console.log(data);

    //render country 1
    // renderCountry(data);

    //get neighbour country (2)
    const neighbour = data.borders?.[0]; //works with countries with no borders
    if (!neighbour) return;

    //ajax call 2
    const request = new XMLHttpRequest();
    request.open("get", `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request.send();
    request.addEventListener("load", function () {
      const [data] = JSON.parse(this.responseText);
      // renderCountry(data, "neighbour");
    });
  });
};

getCountryAndNeighbour("usa");

const getJSON = (url, errormsg='Something went wrong.') => {
  return fetch(url)
    .then(response => {
      if (!response.ok) { // if response.ok is false
        throw new Error(`${errormsg}: ${response.status}`)
      }
      return response.json()
    })
}

//fetch API -- fetch returns Promise

const renderError = (msg) => {
  countriesContainer.insertAdjacentText('beforeend', msg)
  countriesContainer.style.opacity = 1;
}
const requestFetch = fetch(`https://restcountries.com/v3.1/name/portugal`)
// console.log(requestFetch);

const getCountryDataFetch = (country) => {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      if (!response.ok) { // if response.ok is false
        throw new Error(`Country not found, status ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      renderCountry(data[0])
      const neighbour = data[0].borders?.[0]
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}x`)
    })
    .then(res => {
      if (!res.ok) { // if response.ok is false
        throw new Error(`Neighbour not found, status ${res.status}`)
      }
      return res.json()
    })
    .then(data => renderCountry(data[0], "neighbour"))
    .catch(err => {
      console.error(err)
      renderError(`OOps, something went wrong: ${err.message}`)
    })
  .finally(()=>{console.log('finally');})
}

const getCountryWithHelper = (country) => {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found :(')
   .then((data) => {
      renderCountry(data[0])
      const neighbour = data[0].borders?.[0]
      if (!neighbour) throw new Error('no neighbor found');
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Neighbour not found')
   })
    .then(data => renderCountry(data[0], "neighbour"))
    .catch(err => {
      console.error(err)
      renderError(`OOps, something went wrong: ${err.message}`)
    })
}


btn.addEventListener('click', () => {
  // getCountryDataFetch('austria')
  getCountryWithHelper('australia')
})

// getCountryDataFetch('xyxyxy'); //fetch only rejects when there is no internet connection!