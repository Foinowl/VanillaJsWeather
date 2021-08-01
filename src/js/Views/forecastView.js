import { elements } from './base';
import { mapImages } from "../../img"

import svgLocal from "../../img/location.svg"
import svgPlus from "../../img/plus.svg"

export const renderView = (current, data, other) => {
  const markup = `
    <div class="forecast open">
      <button class="close-popup animated fadeIn delay-1s">
	  	<span class="close-popup--icon">
			${svgPlus}  
		 </span>
      </button>
      <div class="title animated fadeIn">
		<span class="title__icon">
			${svgLocal}  
		</span>
        <h1 class="title__text">
          ${current.name}
        </h1>
      </div>
      ${
				other
					? `<button class="remove animated fadeIn delay-1s" data-id='${data}'>Remove from Saved</button>`
					: ""
			}
      <div class="current noselect">
      <div class="main__weather animated fadeIn">
        <h2 class="main__weather__city animated fadeIn">Current Weather</h2>
          <div class="main__weather__details">
		  	<span class="main__weather__details--icon animated fadeIn">
		  		${mapImages[current.weather.icon]}
		 	</span>

            <div class="main__weather__details--temp animated fadeIn">
				${current.weather.temp}ºC
			</div>
          </div>
          <div class="main__weather__text">
            <div class="main__weather__text--phrase animated fadeIn">${
							current.weather.name
						}</div>
            <div class="main__weather__text--minmax animated fadeIn">${
							current.weather.temp_min
						}ºC <span class="dot">•</span> ${current.weather.temp_max}ºC</div>
        </div>
        </div>
      </div>
      <div class="title__text--subtitle animated fadeIn">Forecast for the next 5 days</div>
      <div class="days">
      </div>
    </div>
  `
  elements.container.innerHTML = markup;
};

// Render each result
export const renderResult = (result, container) => {
  const markup = `
    <div class="cities__weather animated fadeIn noselect">
      <div class="cities__weather__name animated fadeIn">${result.date}</div>
      <div class="cities__weather__details">
	  	<span class="cities__weather__details--icon animated fadeIn">
		  ${mapImages[result.icon]}
		 </span>
        <div class="cities__weather__details__text">
          <div class="cities__weather__details__text--phrase animated fadeIn">
            ${result.name}
          </div>
          <div class="cities__weather__details__text--minmax animated fadeIn">
            ${result.temp_min}ºC <span class="dot">•</span> ${result.temp_max}ºC
          </div>
        </div>
        <div class="cities__weather__details__temp animated fadeIn">
          ${result.temp}ºC
        </div>
      </div>
    </div>
  `
  container.insertAdjacentHTML('beforeend', markup);
};
