import { useState, useEffect } from 'react'
import Weather from '../service/CountryWeather'
import WeatherImage from './WeatherImage';

const KELVIN_TO_CELSUIS_FACTOR = -273.15;

const CurrentWeather = ({ cityName }) => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [showWeather, setShowWeather] = useState(false);

    useEffect(() => {
        Weather.getWeatherByCity(cityName)
            .then(response => {
                setCurrentWeather(response)
                setShowWeather(true)
            })
            .catch(response => setShowWeather(false))  // eslint-disable-line no-unused-vars
    }, [cityName])

    return (
        <div>
            {showWeather ? (
                <div>
                    <p>Current temperature is {currentWeather && currentWeather.main.temp + KELVIN_TO_CELSUIS_FACTOR} Celcius</p>
                    {(currentWeather && currentWeather.weather.length >= 1) && <WeatherImage weatherImageCode={currentWeather.weather[0].icon} />}
                    <p>Current wind is {currentWeather && currentWeather.wind.speed} m/s</p>
                </div>
            ) : (
                <p> <i>Weather servies are offline at the moment, try again later </i> </p>
            ) }
        </div>
    )
}

export default CurrentWeather