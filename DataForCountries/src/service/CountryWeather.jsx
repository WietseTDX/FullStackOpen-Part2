import axios from 'axios'

const URL = (cityName) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_APIKEY_OPENWEATHER}`
}

const getWeatherByCity = (cityName) => {
  const request = axios.get(URL(cityName));
  return request.then(response => response.data);
}



export default { getWeatherByCity }