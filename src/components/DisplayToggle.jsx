import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';

export default function DisplayToggle() {
  const [alignment, setAlignment] = React.useState('cases');
  const handleChange = (
    event,
    newAlignment,
  ) => {
    if (newAlignment != null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      sx={{
        borderRadius: '4px',
        // backgroundColor: alignment === 'cases' ? 'red' : 'green',
      }}
    >
      <ToggleButton
        value="cases"
        sx={{
          '&.Mui-selected, &.Mui-selected:hover': {
            color: 'red',
            border: 'solid 3px red',
            backgroundColor: "rgba(255,0,0,0.2)"
          },
          border: 'solid 3px grey',
          borderRadius: '4px',
          backgroundColor: 'white',

        }}
      > <CoronavirusIcon/>Total Covid Cases</ToggleButton>
      <ToggleButton
        value="vaccination"
        sx={{
          '&.Mui-selected, &.Mui-selected:hover': {
            color: 'green',
            backgroundColor: "rgba(0,255,0,0.25)",
            border: 'solid 3px green',
          },
          border: 'solid 3px grey',
          borderRadius: '4px',
          backgroundColor: 'white'
        }}
      ><VaccinesIcon/>Vaccination Rate</ToggleButton>
    </ToggleButtonGroup>
  );
}
