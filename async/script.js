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


///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.
Here are your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.
PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)
TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
GOOD LUCK 😀
*/

const whereAmI = (lat, lng) => {
  const url = `https://geocode.xyz/${lat},${lng}?json=1`
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`${res.error?.message ?? "OOps, something went wrong"}`)
      return res.json()
    })
    .then((data) => {
      // console.log(data);
      // console.log(`You are in ${data?.city ?? ''}, ${data?.country ?? 'unknown territory'}`);
    })
    .catch((err) => {
    // console.log(`OOps, something terrible happened`)
  })
}

// whereAmI(52.508, 13.381)
// whereAmI(19.037, 72.873)
whereAmI(190.037, 272.873)
// whereAmI(-33.933, 18.474)

//EVENT LOOP

console.log('test -- START'); //1.
setTimeout(() => console.log('0 sec timer'), 0)//5. at least 0 sec!!!can be delayed by microtasks
Promise.resolve('Resolved Promise 1').then(res => console.log(res)); //3.

Promise.resolve('Resolve promise 2').then(res => {
  for (let i = 0; i < 10000000000; i++){

  }//takes a long time
  console.log(res)//4
})
console.log('test -- END');//2.