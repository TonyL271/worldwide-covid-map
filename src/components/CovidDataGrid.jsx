import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';

const deciComparator = (v1, v2) => {
    return parseInt(v2.replaceAll(',', '')) - parseInt(v1.replaceAll(',', ''));
}

const percentComparator = (v1, v2) => {
    return parseFloat(v2.replaceAll('%', '')) - parseFloat(v1.replaceAll('%', ''));
}



const CovidDataGrid = ({ selection, setSelection, geoJson, colors, stats, smallScreen, geoRef, displayMode }) => {

    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'bounds', headerName: 'Bounds', hide: true },
        { field: 'country', headerName: 'Country', flex: 1 },
        { field: 'covidCases', headerName: 'Covid Cases', hide: !(displayMode === 'cases'), sortComparator: deciComparator, flex: 0.8 },
        { field: 'vaccinationRates', headerName: 'Vaccination Rate', hide: displayMode === 'cases', sortComparator: deciComparator, flex: 0.8 },
        { field: 'percentByPop', headerName: ' % by Pop', hide: !(displayMode === 'cases'), sortComparator: percentComparator, flex: 0.65 }
    ];

    const [gridRows, setGridRows] = useState([]);

    const intializeRow = () => {
        let bounds = {};
        for (const [key, layer] of Object.entries(geoRef._layers)) {
            const name = layer.feature.properties.name;
            const bound = layer._bounds
            bounds[name] = bound;
        }
        let row;
        let rows = [];
        let state;
        for (let i = 0; i < geoJson.length; i++) {
            row = {};
            state = geoJson[i];
            row.id = i;
            row.bounds = bounds[state.properties.name];
            row.country = state.properties.name;
            row.covidCases = state.properties.casesFormatted;
            row.vaccinationRates = state.properties.vaccinationPercentage.toPrecision(2) + "%";
            row.vaccinationRates = row.vaccinationRates === '-1.0%' ? 'not Recorded' : row.vaccinationRates ;
            row.percentByPop = ((state.properties.cases / stats.totalCases) * 100).toPrecision(2) + "%";
            rows.push(row);
        }
        setGridRows(rows);
    }

    useEffect(() => {
        if (geoRef && Object.keys(stats).length && geoJson.length)
            intializeRow()
    }, [stats, geoJson, geoRef])

    return (
        <Box sx={{
            backgroundColor: '#181a1b',
            display: 'flex',
            flex: 1,
            padding: '1rem',
            paddingTop: smallScreen ? '3rem' : '1rem',
            height: '100%',
            width: '100%',
        }}>
            <DataGrid
                sx={{
                    mt: smallScreen ? '5rem' : '0',
                    color: '#e7e5e2',
                    height: smallScreen ? '90%' : '100%',
                    width: '100%',
                }}
                rows={gridRows}
                columns={columns}
                // onRowClick={onRowClick}
                // onStateChange={onStateChange}
                selection={selection}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'state', sort: 'asc' }],
                    },
                }}
            />
        </Box>
    )
}

export default CovidDataGrid