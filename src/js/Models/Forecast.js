import axios from 'axios';
import moment from 'moment';

export default class Forecast {
  constructor(current, data) {
    this.name = current.name;
    this.currentWeather = current;
    this.data = data;
  }

  async getForecast() {
    let query;
    if (this.data.length === 1) {
      query = `http://api.openweathermap.org/data/2.5/forecast?id=${
        this.data[0]
      }&units=metric&appid=${process.env.APIKEY}`;
    } else {
      query = `http://api.openweathermap.org/data/2.5/forecast?lat=${this.data[0]}&lon=${
        this.data[1]
      }&units=metric&appid=${process.env.APIKEY}`;
    }
    try {
      const res = await axios.get(`${query}`);

      this.weather = res.data.list.map(el => ({
        date: moment
          .unix(el.dt)
          .utc()
          .format('dddd, Do MMMM, HH:mm'),
        temp: Math.round(el.main.temp),
        temp_max: Math.round(el.main.temp_max),
        temp_min: Math.round(el.main.temp_min),
        name: el.weather[0].main,
        icon: el.weather[0].icon,
      }));
    } catch (err) {
      console.log(err);
    }
  }
}
