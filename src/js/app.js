import Current from './Models/Current';
import Saved from './Models/Saved'
import Forecast from "./Models/Forecast"
import Others from "./Models/Others"
import Search from './Models/Search';

import DarkMode from './Models/Dark';


import * as base from './Views/base';
import * as homeView from './Views/homeView';
import * as forecastView from './Views/forecastView';
import * as searchView from './Views/searchView';

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

const otherController = () => {
	// Get parent div
	const parent = document.querySelector(".cities")

	if (state.saved.checkSaved() === 0) {
		base.renderError(
			parent,
			"You have no saved cities. Click the button above to add them!"
		)
		return
	}

	if (!state.others) state.others = new Others()

	if (state.others.weatherPresent() > 0) state.others.clearWeather()

	base.renderLoader(parent)

	state.saved.saved.forEach(async (location, i, arr) => {
		const weather = await state.others.getWeather(location)
		homeView.renderWeather(weather, parent, "other")
		// if last iteration, clear loader
		if (i === arr.length - 1) {
			base.clearLoader(parent)
			homeView.renderDeleteAll(parent)
		}
	})
}

const forescastController = async (current, data, other) => {
	if (current && data) state.forecast = new Forecast(current, data)

	forecastView.renderView(current, data, other)

	const parent = document.querySelector(".days")
	base.renderLoader(parent)

	await state.forecast.getForecast()

	state.forecast.weather.forEach((el) => forecastView.renderResult(el, parent))

	base.clearLoader(parent)
}


async function searchController(e) {
  e.preventDefault();

  if (!this.value) return;
  state.search = new Search(this.value);

  const parent = document.querySelector('.search__results');
  base.renderLoader(parent);

  await state.search.getResults();

  base.clearLoader(parent);

  searchView.clearSearch();

  if (!state.search.results) {
    const msg = 'There were no results, sorry!';
    base.renderError(parent, msg);
  }

  // Otherwise, show them
  else {
    state.search.results.forEach(res => {
      // If location is saved, pass true on 2nd parameter
      const isSaved = state.saved.checkifSaved(res.id);
      searchView.renderResults(res, isSaved);
    });
  }
}

const savedController = id => {
  if (!state.saved) state.saved = new Saved();

  if (!state.saved.checkifSaved(id)) {
    state.saved.addLocation(id);

    state.saved.saveLocal();

    homeView.renderHome();
    darkmodeController();
    currentController();
    otherController();
  }
}

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


    if (removeBtnAll) {
		state.saved.deleteAllLocations()
		base.clearUI()
		homeView.renderHome()
		currentController()
		otherController()
	}

	if (removeBtn && removeBtn.dataset.id) {
		const id = [parseInt(removeBtn.dataset.id, 10)]
		state.saved.deleteLocation(id)
		base.clearUI()
		homeView.renderHome()
		darkmodeController()
		currentController()
		otherController()
	}

	if (closeBtn) {
		base.clearUI()
		homeView.renderHome()
		darkmodeController()
		currentController()
		otherController()
	}


	if (removeBtn && removeBtn.dataset.id) {
		const id = [parseInt(removeBtn.dataset.id, 10)]
		state.saved.deleteLocation(id)
		// Render home
		base.clearUI()
		homeView.renderHome()
		darkmodeController()
		currentController()
		otherController()
	}

	if (closeBtn) {
		// Render home
		base.clearUI()
		homeView.renderHome()
		darkmodeController()
		currentController()
		otherController()
	}

	// If city card clicked
	if (cityCard && cityCard.dataset.id) {
		const id = [parseInt(cityCard.dataset.id, 10)]
		const current = state.others.returnWeather(id)
		forescastController(current, id, true)
	}

	// If current card clicked
	if (currentCard && currentCard.dataset.id) {
		const coords = currentCard.dataset.id.split(",").map(JSON.parse)
		const { current } = state
		if (coords.length === 2) forescastController(current, coords, false)
	}

	if (addCityBtn) {
		// Clear UI
		base.clearUI()
		// Render search view
		searchView.renderSearch()

		// Get form and add event listener to it
		const form = document.querySelector(".search__form")
		const input = document.querySelector(".search__form__input")
		form.addEventListener("submit", searchController)
		input.addEventListener("change", searchController)
	}

	if (searchItem) {
		const id = parseInt(searchItem.dataset.id, 10)
		savedController(id)
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
	otherController()
})