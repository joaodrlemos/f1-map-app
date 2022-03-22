import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import ChargingStations from './ChargingStations';
import Directions from './Directions';
import StationType from './StationType';

function App() {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [stationType, setStationType] = useState('ALL');

  const defaultPosition = { center: { lat: 38, lng: -8.3 }, zoom: 8 };

  return (
    <div style={{ height: '97vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY, libraries: ['directions','geometry'] }}
        defaultCenter={defaultPosition.center}
        defaultZoom={defaultPosition.zoom}
        onGoogleApiLoaded={({ map }) => { setMap(map) }}
        yesIWantToUseGoogleMapApiInternals
      />
      <StationType stationType={stationType} setStationType={setStationType} />
      <Directions directions={directions} setDirections={setDirections} map={map} />
      <ChargingStations directions={directions} stationType={stationType} map={map} />
    </div>
  );
}

export default App;
