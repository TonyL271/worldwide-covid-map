import React from 'react'
import LegendItems from './LegendItems'
import { Grid } from '@mui/material'


const Legend = ({ colors, stats, smallScreen, sx }) => {
  const intervalCount = 6
  return (
    <Grid container className='legend' sx={sx}>
      {
        Array(intervalCount).fill(0).map((_, i) => (
          <LegendItems key={i} smallScreen={smallScreen} range={stats.ranges[i]} bColor={colors[i]} />
        ))
      }
    </Grid>
  )
}

export default Legend