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
  //   countriesContainer.style.opacity = 1;
};

const displayError = function (err) {
  countriesContainer.insertAdjacentText('beforeend', err);
  //   countriesContainer.style.opacity = 1;
};

const getDataAndConvertToJSON = function (
  url,
  errorMessage = 'Something went wrong 💥💥'
) {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(`${errorMessage}, error ${response.status}`);
    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found, error ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       displayCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       // Modify the fetch URL to correct API version
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found, error ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       if (data) displayCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       displayError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  getDataAndConvertToJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found'
  )
    .then(data => {
      displayCountry(data[0]);
      if (!data[0].borders) throw new Error('No neighbour found!');

      const neighbour = data[0].borders[0];

      // Modify the fetch URL to correct API version
      return getDataAndConvertToJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => displayCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      displayError(`Something went wrong 💥💥 ${err.message} Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
// btn.addEventListener('click', function () {
//   getCountryData('greenland');
// });

///////////////////////////////////////////

// const displayCountryByGPS = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(
//           `Проблема с геокодированием (ошибка ${response.status})`
//         );
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return getDataAndConvertToJSON(
//         `https://restcountries.com/v3.1/name/${data.country.toLowerCase()}`,
//         'Страна не найдена.'
//       );
//     })
//     .then(data => displayCountry(data[0]))
//     .catch(e => {
//       console.error(`${e} 🧐`);
//       displayError(`Что-то пошло не так 🧐: ${e.message} Попробуйте ещё раз!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     })

//     .catch(e => console.error(`${e.message} 🧐`));
// };

// displayCountryByGPS(35.756, 139.256);
// displayCountryByGPS(48.857, 2.358);
// displayCountryByGPS(40.708, -74.051);

////////////////////////////////////////////////
//Пример рфботы с циклом событий Event Loop
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log('Test end');

/////////////////////////////////////////////

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     }
//     reject(new Error('You lost your money 💩'));
//   }, 3000);
// });
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(3).then(() => {
//   console.log('I waited for 3 seconds');
//   return wait(2).then(() => console.log('I waited for 2 seconds'));
// });

// wait(1)
//   .then(() => {
//     console.log('Прошла 1 секунда');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('Прошла 2 секунда');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('Прошла 3 секунда');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('Прошла 4 секунда');
//     return wait(1);
//   });

// Promise.resolve('Resolved!').then(res => console.log(res));
// Promise.reject(new Error('Rejected!')).catch(err => console.error(err));

/////////////////////////////////////////////
//Промисификация геолокации API

const getUserPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getUserPosition()
//   .then(pos => console.log(pos))
//   .catch(err => console.error(err));

const displayUserCountry = function () {
  getUserPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(
          `Проблема с геокодированием (ошибка ${response.status})`
        );
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return getDataAndConvertToJSON(
        `https://restcountries.com/v3.1/name/${data.country.toLowerCase()}`,
        'Страна не найдена.'
      );
    })
    .then(data => displayCountry(data[0]))
    .catch(e => {
      console.error(`${e} 🧐`);
      displayError(`Что-то пошло не так 🧐: ${e.message} Попробуйте ещё раз!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    })

    .catch(e => console.error(`${e.message} 🧐`));
};

// btn.addEventListener('click', displayUserCountry);

function createImageElement(imagePath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imagePath;

    img.addEventListener('load', () => {
      document.querySelector('.images').appendChild(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Failed to load image.'));
    });
  });
}

let currentImg;

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

createImageElement('img/image1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImageElement('img/image2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
