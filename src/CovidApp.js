import { useEffect, useState } from 'react';
import { CovidMap, Loading, Legend, Hamburger, DisplayToggle } from './components';
import { CovidTable } from './components/covid-table';
import { loadGeoData, loadStatsData } from './data/FormatData';
import Box from '@mui/material/Box';
import './styles.css';
function CovidApp() {
   const colors = ["#FFEDA0", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026", "#800026"];
   const [geoJson, setGeoJson] = useState([]);
   const [stats, setStats] = useState({});
   const [smallScreen, setSmallScreen] = useState(window.innerWidth < 1000);
   const [focusRegion, setFocusRegion] = useState({ name: 'United States' });
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
      setOpen(false);
   }, [focusRegion])

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
            height: `${window.innerHeight}px`,
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
            <Box className="data-grid" sx={{
               width: '100%', height: '100%', flexGrow: 1, overflowY: 'scroll',
               '&::-webkit-scrollbar': {
                  width: '20px',
               },
               '&::-webkit-scrollbar-track': {
                  border: '7px solid #232943',
                  boxShadow: 'inset 0 0 2.5px 2px rgba(0,0,0,0.5)',
               },
               '&::-webkit-scrollbar-thumb': {
                  background: 'linear-gradient(45deg,#06dee1,#79ff6c)',
                  borderRadius: '15px',
               }
            }}>
               {stats.hasOwnProperty('ranges') ?
                  <CovidTable
                     focusRegion={focusRegion} setFocusRegion={setFocusRegion}
                     geoJson={geoJson} displayMode={displayMode}
                     stats={stats} smallScreen={smallScreen}
                     setOpen={setOpen}
                  /> : <Loading />}
            </Box>
         </Box>
         <Box className="mapContainer" sx={{
            display: smallScreen && open ? "none" : 'flex',
            height: `${window.innerHeight}px`
         }}>
            {smallScreen && <Hamburger open={open} setOpen={setOpen} sx={{ position: 'absolute' }} />}
            {stats.hasOwnProperty('ranges') ?
               <Box sx={{ height: '90%', }}>
                  <CovidMap
                     geoJson={geoJson}
                     colors={colors}
                     stats={stats}
                     focusRegion={focusRegion}
                     setFocusRegion={setFocusRegion}
                  />
               </Box>
               :
               <div>Loading</div>}
            {stats.hasOwnProperty('ranges') ?
               <Legend geoJson={geoJson} colors={colors} stats={stats} smallScreen={smallScreen} sx={{ flexBasis: 'max-content' }} /> :
               <Loading />}
         </Box>
      </div >
   );
}

export default CovidApp;
