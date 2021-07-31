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
})