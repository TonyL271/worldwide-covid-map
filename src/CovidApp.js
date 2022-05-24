import { useEffect, useState } from 'react';
import { CovidMap, Loading, Legend, CovidTable, Hamburger, DisplayToggle, CountrySelect } from './components';
import { loadGeoData, loadStatsData } from './data/FormatData';
import Box from '@mui/material/Box';
import './styles.css';
function CovidApp() {
  const colors = ["#FFEDA0", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026", "#800026"];
  const [geoJson, setGeoJson] = useState([]);
  const [stats, setStats] = useState({});
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 1000);
  const [geoRef, setGeoRef] = useState(null);
  const [selection, setSelection] = useState('');
  const [open, setOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState('cases')

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

  return (
    <div className="covidApp">
      <Box className="menu" sx={{
        display: !open && smallScreen ? 'none' : 'flex',
        width: smallScreen ? '100vw' : '350px',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#181A1B',
        zIndex: open && smallScreen ? 2000 : 'auto',
      }}>
        {smallScreen && open && <Hamburger open={open} setOpen={setOpen} sx={{ position: 'relative' }} />}
        <Box className='selection-panel' sx={{
          margin: 'auto',
          width: open && smallScreen ? '100%' : '80%',
          padding: '1rem',
          display: 'flex'
        }} >
          <DisplayToggle displayMode={displayMode} setDisplayMode={setDisplayMode} />
        </Box>
        {/* prefviosuly this changed states */}
        <Box className="data-grid" sx={{ width: '100%', height: '100%', flexGrow: 1, overflowY: 'scroll' }}>
          {stats.hasOwnProperty('ranges') ?
            <CovidTable
              selection={selection} setSelection={setSelection}
              geoJson={geoJson} displayMode={displayMode}
              stats={stats} smallScreen={smallScreen}
            /> : <Loading />}
        </Box>
      </Box>
      <Box className="mapContainer" sx={{ display: smallScreen && open ? "none" : 'flex' }}>
        {smallScreen && <Hamburger open={open} setOpen={setOpen} sx={{ position: 'absolute' }} />}
        {stats.hasOwnProperty('ranges') ? <CovidMap geoJson={geoJson} colors={colors} stats={stats} setGeoRef={setGeoRef} /> : <div>Loading</div>}
        {stats.hasOwnProperty('ranges') ? <Legend geoJson={geoJson} colors={colors} stats={stats} smallScreen={smallScreen} sx={{ height: '10%' }} /> : <Loading />}
      </Box>
    </div >
  );
}

export default CovidApp;
