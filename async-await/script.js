'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////////////////////
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v3.1/name/ukraine`);

request.send();

request.addEventListener('load', function () {
  const [data] = JSON.parse(this.responseText);
  console.log(data);

  // map each currency object to its name
  const currencies = Object.values(data.currencies)
    .map(currency => currency.name)
    .join(', ');
  const languages = Object.values(data.languages).join(', ');

  const html = `
        <article class="country">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${languages}</p>
            <p class="country__row"><span>💰</span>${currencies}</p>
        </div>
        </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
});
