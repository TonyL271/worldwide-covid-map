import React from 'react'
import { Select, MenuItem } from '@mui/material';

const CountrySelect = ({countryNames}) => {
  return (
      <Select>
          {countryNames.map((name)=>(
              <MenuItem
                key={name}
                value={name}
              >
              </MenuItem>
          ))}
      </Select>
  )
}

export default CountrySelect