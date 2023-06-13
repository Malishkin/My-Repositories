'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////////////////////

const getCountryAndBourderCountries = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //Отображение страны
    displayCountry(data);
    //Отображение первой граничащей страны
    const [firstNeighbour] = data.borders;
    if (!firstNeighbour) return;
    // вызов AJAX для получения данных о первой соседней стране
    const request2 = new XMLHttpRequest();

    request2.open(
      'GET',
      `https://restcountries.com/v3.1/alpha/${firstNeighbour}`
    );
    request2.send();
    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      displayCountry(data2, 'neighbour');
    });
  });
};

const displayCountry = function (data, className = '') {
  const currencies = Object.values(data.currencies)
    .map(currency => `${currency.name} (${currency.symbol})`)
    .join(', ');

  const languages = Object.values(data.languages).join(', ');

  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} million</p>
          <p class="country__row"><span>🗣️</span>${languages}</p>
          <p class="country__row"><span>💰</span>${currencies}</p>
        </div>
      </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      displayCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;

      // Modify the fetch URL to correct API version
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (response) return response.json();
    })
    .then(data => {
      if (data) displayCountry(data[0], 'neighbour');
    })
    .catch(err => console.error(err));
};

getCountryData('ukraine');
