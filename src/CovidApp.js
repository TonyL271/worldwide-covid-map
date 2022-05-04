import { useEffect, useState } from 'react';
import { CovidMap, Loading, Legend, CovidDataGrid, Hamburger, DisplayToggle, CountrySelect } from './components';
import { loadGeoData, loadStatsData } from './data/FormatData';
import './styles.css';
function CovidApp() {
  const colors = ["#FFEDA0", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026", "#800026"];
  const [geoJson, setGeoJson] = useState([]);
  const [stats, setStats] = useState({});
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 1000);
  const [gridState, setGridState] = useState('');
  const [geoRef, setGeoRef] = useState(null);
  const [selection, setSelection] = useState('');
  const [open, setOpen] = useState(false);

  const updateGridState = () => {
    let classes = ''
    if (smallScreen) {
      classes += open ? 'openGrid' : 'hideGrid';
    } else {
      classes += 'default';
    }
    setGridState(classes)
  }

  const smallScreenDetection = () => {
    function smallScreenListener() {
      setSmallScreen(window.innerWidth < 1000)
    }
    window.addEventListener('resize', smallScreenListener);
    return () => {
      window.removeEventListener('resize', smallScreenListener);
    }
  }

  useEffect(() => {
    loadGeoData().then(geoJson => setGeoJson(geoJson))
  }, [])
  useEffect(() => {
    if (geoJson.length)
      setStats(loadStatsData(geoJson));
  }, [geoJson])
  useEffect(() => (smallScreenDetection()), [stats])
  useEffect(updateGridState, [smallScreen, open])


  return (
    <div className="covidApp">
      <div className="menu">
        <div className='selection-panel'>
          {/* <CountrySelect /> */}
          <DisplayToggle />
        </div>
        <div className={"data-grid " + gridState}>
          {stats.hasOwnProperty('ranges') ? <CovidDataGrid selection={selection} setSelection={setSelection} geoJson={geoJson} colors={colors} stats={stats} smallScreen={smallScreen} geoRef={geoRef} /> : <Loading />}
        </div>
      </div>
      <div className="mapContainer">
        {smallScreen && <Hamburger open={open} setOpen={setOpen} />}
        {stats.hasOwnProperty('ranges') ? <CovidMap geoJson={geoJson} colors={colors} stats={stats} setGeoRef={setGeoRef} /> : <div>Loading</div>}
        {stats.hasOwnProperty('ranges') ? <Legend geoJson={geoJson} colors={colors} stats={stats} smallScreen={smallScreen} /> : <Loading />}
      </div>
    </div>
  );
}

export default CovidApp;
