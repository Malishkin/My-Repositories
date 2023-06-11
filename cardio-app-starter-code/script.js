'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputTemp = document.querySelector('.form__input--temp');
const inputClimb = document.querySelector('.form__input--climb');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, temp) {
    super(coords, distance, duration);
    this.temp = temp;
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, climb) {
    super(coords, distance, duration);
    this.climb = climb;
    this.calcSpeed();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([32.13, 34.8], 5.2, 24, 42);
// const cycling1 = new Cycling([32.13, 34.8], 27, 95, 523);

console.log(run1, cycling1);
class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleClimbField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 13);
    console.log(this.#map);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.#map);
    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleClimbField() {
    inputClimb.closest('.form__row').classList.toggle('form__row--hidden');
    inputTemp.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    //Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { latit, lngit } = this.#mapEvent.latlng;
    let workout;

    //Check if data is valid
    if (
      !Number.isFinite(distance) ||
      !Number.isFinite(duration) ||
      !Number.isFinite(latit) ||
      !Number.isFinite(lngit)
    )
      return alert('Inputs have to be positive numbers!');

    //If workout running, create running object
    if (type === 'running') {
      const temp = +inputTemp.value;
      workout = new Running([latit, lngit], distance, duration, temp);
    }

    //If workout cycling, create cycling object
    if (type === 'cycling') {
      const climb = +inputClimb.value;
      workout = new Cycling([latit, lngit], distance, duration, climb);
    }

    //Add new object to workout array
    workout.push(workout);
    console.log(workout);

    //Render workout on map as marker
    workout.renderMarker();

    //Render workout on list
    workout.renderWorkout();

    e.preventDefault();
    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputTemp.value =
      inputClimb.value =
        '';
    // Display marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng]).addTo(this.#map).bindPopup('Workout').openPopup();
  }

  renderMarker() {
    L.marker(this.coords).addTo(this.#map).bindPopup('Workout').openPopup();
  }

  renderWorkout() {
    const html = `
    <li class="workout workout--running">
    <h2 class="workout__title">Running on April 14</h2>
    <div class="workout__details">
      <span class="workout__icon">🏃‍♂️</span>
      <span class="workout__value">5.2</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">24</span>
      <span class="workout__unit">min</span>
    </div>`;
  }
}

const app = new App();
