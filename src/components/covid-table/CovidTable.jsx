import React, { useEffect, useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import MaUTable from '@material-ui/core/Table'
import { Box } from '@mui/material'
import {Body,Head} from './'

const CovidTable = ({ displayMode, geoJson, stats, }) => {
    const data = React.useMemo(
        () => {
            let result = []
            let state;
            let row;
            for (let i = 0; i < geoJson.length; i++) {
                row = {}
                row.id = i + 1;
                state = geoJson[i];
                row.country = state.properties.name;
                if (state.properties.cases === -1) {
                    continue;
                } else {
                    row.covidCase = state.properties.casesFormatted;
                    row.vaccinationRate = state.properties.vaccinationPercentage.toPrecision(2) + "%";
                    row.percentByPop = ((state.properties.cases / stats.totalCases) * 100).toPrecision(2) + "%";
                }
                result.push(row);
            }
            return result;
        },
        []
    )

    const covidCaseSort = (a, b) => {
        a = a.values.covidCase.split(',').reduce((a, b) => a + b);
        b = b.values.covidCase.split(',').reduce((a, b) => a + b);
        return parseInt(b) - parseInt(a);
    }

    const vaccinationSort = (a, b) => {
        a = parseFloat(a.values.vaccinationRate.split('%').reduce((a, b) => a + b));
        b = parseFloat(b.values.vaccinationRate.split('%').reduce((a, b) => a + b));
        return parseInt(b) - parseInt(a);
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'bounds',
                accessor: 'bounds', // accessor is the "key" in the data
            },
            {
                Header: 'id',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'Country',
                accessor: 'country', // accessor is the "key" in the data
            },
            {
                Header: 'Covid Case',
                accessor: 'covidCase',
                sortType: covidCaseSort,
            },
            {
                Header: 'Vaccination Rate',
                accessor: 'vaccinationRate',
                sortType: vaccinationSort,
            },
            {
                Header: '%',
                accessor: 'percentByPop',
                sortType: covidCaseSort,
            },
        ],
        []
    )

    const sortBy = useMemo(() => [{ id: 'covidCase', desc: false }])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        allColumns,
        prepareRow,
    } = useTable({
        columns, data,
        initialState: {
            sortBy: sortBy
        }
    }, useSortBy)

    useEffect(() => {
        allColumns[0].toggleHidden(true);
        allColumns[1].toggleHidden(true);
    }, [])

    useEffect(() => {
        if (displayMode === 'cases') {
            allColumns[4].toggleHidden(true);
            allColumns[3].toggleHidden(false);
            allColumns[5].toggleHidden(false);
        } else if (displayMode === 'vaccination') {
            allColumns[4].toggleHidden(false);
            allColumns[3].toggleHidden(true);
            allColumns[5].toggleHidden(true);
        }

    }, [displayMode])

    return (
        <Box sx={{
            margin: '1rem',
            padding: '1px',
            border: '1px solid white',
            borderRadius: '10px',
            '&::-webkit-scrollbar': {
                height: '7px'
            },
            '&::-webkit-scrollbar-track': {
                borderRadius: '10px',
                webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
            },
            '&::-webkit-scrollbar-thumb': {
                // backgroundColor: 'a6c53b',
                backgroundColor: 'red',
                webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.5)',
            },
            '& th:first-of-type': {
                borderTopLeftRadius: '10px',
            },

            '& th:last-child': {
                borderTopRightRadius: '10px',
            },

            '& tr:last-child td': {
                borderBottom: '0',
            },

            '& tr:last-child td:first-of-type': {
                borderBottomLeftRadius: '10px',
            },

            '& tr:last-child td:last-child': {
                borderBottomRightRadius: '10px',
            },
            marginTop: 0
        }}>
            <MaUTable {...getTableProps()} >
                <Head headerGroups={headerGroups}/>
                <Body rows={rows} getTableBodyProps={getTableBodyProps} prepareRow={prepareRow} />
            </MaUTable>
        </Box >
    )
}

export default CovidTable