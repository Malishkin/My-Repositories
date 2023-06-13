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

// В этом задании вы создадите функцию displayCountryByGPS(), которая отображает страну только на основе координат GPS. Для этого вы будете использовать вторые API для геокодирования координат. Итак, в этом задании вы вы впервые будете использовать API самостоятельно.

// 1. Создайте функцию displayCountryByGPS(), которая принимает в качестве входных данных значение широты (lat) и значение долготы (lng) (это координаты GPS, примеры приведены в тестовых данных ниже).
// 2. Выполните «обратное геокодирование» предоставленных координат. Обратное геокодирование означает преобразование координат в местоположение, такое как название города и страны. Используйте этот API для обратного геокодирования:
// https://geocode.xyz/api
// Вызов AJAX будет выполняться для URL в следующем формате:
// https://geocode.xyz/52.508,13.381?geoit=json
// Используйте Fetch API и promises, чтобы получить данные. Не используйте созданную нами функцию getDataAndConvertToJSON()!
// 3. Получив данные, выведите их в консоль, чтобы просмотреть все атрибуты, которые вы получили об указанном местоположении. Затем, используя эти данные, выведите в консоль сообщение такого вида: “You are in Rome, Italy”.
// 4. Присоедините в конце цепочки promises метод catch() и выведите сообщение об ошибках в консоль.
// 5. Эти API позволяют делать только 3 запроса в секунду. Если вы быстро перезагрузите страницу, вы получите ошибку с кодом 403. Это ошибка запроса. Помните, что в этом случае fetch() не отклоняет promise. Поэтому создайте ошибку, чтобы отклонить promise самостоятельно, с сообщением об ошибке, подходящим по смыслу.
// 6. Теперь нужно использовать полученные данные для отображения страны. Выберите соответствующий атрибут из результата API геокодирования и вставьте его в API о странах, которые мы использовали.
// 7. Отобразите страну и перехватите все возможные ошибки, как мы делали в прошлой лекции (вы даже можете скопировать этот код, не нужно писать его заново).

// Тестовые данные:

// Широта
// Долгота
// Координаты 1
// 35.756
// 139.256
// Координаты 2
// 48.857
// 2.358
// Координаты 3
// 40.708
// -74.051

function displayCountryByGPS(lat, lng) {
  const geocodeApi = `https://geocode.xyz/${lat},${lng}?geoit=json`;

  fetch(geocodeApi)
    .then(response => {
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            'Превышено количество запросов. Пожалуйста, попробуйте снова позже.'
          );
        }
        throw new Error('Ошибка при обратном геокодировании.');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const city = data.city;
      const country = data.country;
      console.log(`You are in ${city}, ${country}`);
    })
    .catch(error => console.error('Произошла ошибка:', error.message));
}

// Тестирование функции с различными координатами
displayCountryByGPS(35.756, 139.256);
displayCountryByGPS(48.857, 2.358);
displayCountryByGPS(40.708, -74.051);
