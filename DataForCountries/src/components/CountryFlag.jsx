import { useState } from 'react'

const CountryFlag = ({ flagsData }) => {
  const [isAvailable, setIsAvailable] = useState(false);

  // Function to handle image load
  const handleImageLoad = () => {
    setIsAvailable(true);
  };

  // Function to handle image error
  const handleImageError = () => {
    setIsAvailable(false); // Reset flag loaded state if image loading fails
  };

  return (
    <div>
      {flagsData && (
        <div>
          <p><b>Flag:</b></p>
          <img
            src={flagsData.png}
            alt={flagsData.alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: isAvailable ? 'block' : 'none', maxWidth: '100%', height: 'auto', border: '10px solid black', padding: '10' }}
          />
          {!isAvailable && <p>Flag image loading...</p>}
        </div>
      )}
    </div>
  )
}


export default CountryFlag