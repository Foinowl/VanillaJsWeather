import { elements } from './base';
import svgLocal from "../../img/location.svg"
import svgMap from "../../img/map.svg"
import svgPlus from "../../img/plus.svg"

import {mapImages} from '../../img'

export const renderHome = () => {
  const markup = `
    <div class="darkmode">
		<span class="darkmode__text">Dark Mode:</span>
		<input name= "checkbox" type="checkbox" id="switch" class="switch" /><label for="switch">Toggle</label>
    </div>
    <div class="current noselect">
      <div class="title animated fadeIn">
	  <span class="title__icon">
	  	${svgLocal}
	  </span>
        <h1 class="title__text">Current Location</h1>
      </div>
      <div class="main__weather animated fadeIn">

      </div>
    </div>
    <div class="other">
      <div class="title animated fadeIn">
	  <span class="title__icon">
	  	${svgMap}
	  </span>
        <h1 class="title__text">Other Locations</h1>
      </div>
      <div class="cities">
      </div>
      <button class="add__city animated fadeIn">
	  	<span class="add__city--icon">
	  		${svgPlus}
		</span>
      </button>
    </div>
  `
  elements.container.innerHTML = markup;
};

export const renderWeather = async (result, container, place) => {

	let markup;

  // If weather of main location
  if (place === 'main') {
    markup = `
  <h2 class="main__weather__city animated fadeIn">${result.name}, ${
      result.country
    }</h2>
    <div class="main__weather__details">
		<span class="main__weather__details--icon animated fadeIn">
			${mapImages[result.weather.icon]}
		</span>

      <div class="main__weather__details--temp animated fadeIn">${
        result.weather.temp
      }ºC</div>
    </div>
    <div class="main__weather__text">
      <div class="main__weather__text--phrase animated fadeIn">${
        result.weather.name
      }</div>
      <div class="main__weather__text--minmax animated fadeIn">${
        result.weather.temp_min
      }ºC <span class="dot">•</span> ${result.weather.temp_max}ºC</div>
    </div>
  `;
    container.insertAdjacentHTML('afterbegin', markup);
  }

  // If weather of other location
  if (place === 'other') {
    markup = `
    <div class="cities__weather animated fadeIn noselect" data-id="${
      result.id
    }">
      <div class="cities__weather__name animated fadeIn">${result.name}, ${
      result.country
    }</div>
      <div class="cities__weather__details">

		<span class="main__weather__details--icon animated fadeIn">
			${mapImages[result.weather.icon]}
		</span>
        <div class="cities__weather__details__text">
          <div class="cities__weather__details__text--phrase animated fadeIn">
            ${result.weather.name}
          </div>
          <div class="cities__weather__details__text--minmax animated fadeIn">
            ${result.weather.temp_min}ºC <span class="dot">•</span> ${
      result.weather.temp_max
    }ºC
          </div>
        </div>
        <div class="cities__weather__details__temp animated fadeIn">
          ${result.weather.temp}ºC
        </div>
      </div>
    </div>
  `;
    container.insertAdjacentHTML('beforeend', markup);
  }
};

export const renderDeleteAll = parent => {
  const markup = `
  <button class="remove remove__all animated fadeIn delay-1s">Remove all Locations</button>`;
  parent.insertAdjacentHTML('afterend', markup);
};
