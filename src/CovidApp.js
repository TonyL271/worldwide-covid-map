import { useEffect, useState } from 'react';
import { CovidMap, Loading, Legend } from './components';
import { loadGeoData, loadStatsData } from './data/FormatData';
import MenuIcon from '@mui/icons-material/Menu';
import './styles.css';
function CovidApp() {
  const colors = ["#FFEDA0", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026", "#800026"];
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 1000);
  const [geoJson, setGeoJson] = useState([]);
  const [stats, setStats] = useState({});
  useEffect(() => {
    loadGeoData().then(geoJson => setGeoJson(geoJson))
  }, [])

  useEffect(() => {
    if (geoJson.length) {
      setStats(loadStatsData(geoJson));
    }
  }, [geoJson])
  return (
    <div className="covidApp">
      <div className="mapContainer">
        {geoJson.length ? <CovidMap geoJson={geoJson} /> : <div>Loading</div>}
        {stats.hasOwnProperty('ranges') ? <Legend geoJson={geoJson} colors={colors} stats={stats} smallScreen={smallScreen} /> : <Loading />}
      </div>
    </div>
  );
}

export default CovidApp;
