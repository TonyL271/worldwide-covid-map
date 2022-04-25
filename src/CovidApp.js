import { useEffect, useState } from 'react';
import CovidMap from './components/CovidMap';
import { loadGeoData } from './data/FormatData';
import "https://unpkg.com/leaflet.vectorgrid@latest/dist/Leaflet.VectorGrid.bundled.js";
function App() {
  const [geoJson, setGeoJson] = useState([]);
  useEffect(() => {
    loadGeoData().then(geoJson => setGeoJson(geoJson))
  }, [])
  return (
    geoJson.length ? <CovidMap geoJson={geoJson} /> : <div>Loading</div>
  );
}

export default App;
