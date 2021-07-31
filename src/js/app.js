import Current from './Models/Current';
import Saved from './Models/Saved'

import DarkMode from './Models/Dark';


import * as base from './Views/base';
import * as homeView from './Views/homeView';
// import * as searchView from './Views/searchView';
// import * as forecastView from './Views/forecastView';

import '../css/main.scss';

// Global App state
const state = {};

// - DARK MODE CONTROLLER -
const darkmodeController = () => {
  const checkbox = document.querySelector('input[name=checkbox]');
  if (state.darkMode.dark === 0) {
    base.elements.body.classList.remove('dark');
    checkbox.checked = false;
  } else if (state.darkMode.dark === 1) {
    base.elements.body.classList.add('dark');
    checkbox.checked = true;
  }
};


const currentController = async () => {
  // Render Loader
  const parent = document.querySelector('.main__weather');
  base.renderLoader(parent);

  // Create state if its not created
  if (!state.current) state.current = new Current();

  // Get current coords if they are not on state already
  if (state.current.coordAvailable() < 2) {
    await state.current.getCoords();
  }

  // Get weather for current location
  if (state.current.coordAvailable() === 2) {
    await state.current.getWeather();

    // Clear loader
    base.clearLoader(parent);

    // Add data set
    parent.setAttribute('data-id', state.current.coords);

    // Render weather
    homeView.renderWeather(state.current, parent, 'main');
  }
};


base.elements.container.addEventListener('click', e => {
  const closeBtn = e.target.closest('.close-popup');
  const addCityBtn = e.target.closest('.add__city');
  const searchItem = e.target.closest('.search__results__single');
  const cityCard = e.target.closest('.cities__weather');
  const currentCard = e.target.closest('.main__weather');
  const removeBtn = e.target.closest('.remove');
  const removeBtnAll = e.target.closest('.remove__all');
  const checkbox = e.target.closest('input[name=checkbox]');

  if (checkbox) {
    if (checkbox.checked) {
      state.darkMode.dark = 1;
      state.darkMode.saveLocal();
      base.elements.body.classList.add('dark');
    } else {
      state.darkMode.dark = 0;
      state.darkMode.saveLocal();
      base.elements.body.classList.remove('dark');
    }
  }

})

window.addEventListener("load", () => {
	base.clearUI();
	homeView.renderHome();


	state.darkMode = new DarkMode();
	state.darkMode.readLocal();
	darkmodeController();


	state.saved = new Saved();

	// Read data from the local storage
	state.saved.readLocal();

	currentController()
})