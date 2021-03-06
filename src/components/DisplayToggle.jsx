import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';

export default function DisplayToggle({displayMode,setDisplayMode}) {
  const handleChange = (
    event,
    newDisplayMode,
  ) => {
    if (newDisplayMode != null) {
      setDisplayMode(newDisplayMode);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={displayMode}
      exclusive
      onChange={handleChange}
      sx={{
        width:'100%',
        margin:'auto',
        borderRadius: '4px',
        // backgroundColor: alignment === 'cases' ? 'red' : 'green',
      }}
    >
      <ToggleButton
        value="cases"
        sx={{
          width:'100%',
          fontSize: '0.8rem',
          '&:hover':{
            color:'white'
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            border: 'solid 3px red',
            backgroundColor: "rgba(255,0,0,0.2)"
          },
          border: 'solid 3px grey',
          borderRadius: '4px',
          backgroundColor: 'white',

        }}
      > <CoronavirusIcon />Total <br/> Cases</ToggleButton>
      <ToggleButton
        value="vaccination"
        sx={{
          width:'100%',
          fontSize: '0.8rem',
          '&:hover':{
            color:'white'
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: "rgba(0,255,0,0.25)",
            border: 'solid 3px green',
          },
          border: 'solid 3px grey',
          borderRadius: '4px',
          backgroundColor: 'white'
        }}
      ><VaccinesIcon />Vaccination <br/> Rate</ToggleButton>
    </ToggleButtonGroup>
  );
}
