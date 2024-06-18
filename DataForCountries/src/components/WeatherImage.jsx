import { useState } from 'react'

const WeatherImage = ({ weatherImageCode }) => {
  const [isAvailable, setIsAvailable] = useState(false);

  // Function to handle image load
  const handleImageLoad = () => {
    setIsAvailable(true);
  };

  // Function to handle image error
  const handleImageError = () => {
    setIsAvailable(false); // Reset flag loaded state if image loading fails
  };

  const weatherImageURL = `https://openweathermap.org/img/wn/${weatherImageCode}@2x.png`

  return (
    <div>
      {weatherImageCode && (
        <div>
          <img
            src={weatherImageURL}
            alt={'Current weather'}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: isAvailable ? 'block' : 'none', maxWidth: '100%', height: 'auto'}}
          />
          {!isAvailable && <p>Current weather image loading...</p>}
        </div>
      )}
    </div>
  )
}


export default WeatherImage