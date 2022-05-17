import React, { useEffect } from 'react'
import { useTable, useSortBy } from 'react-table'
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Box } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const CovidTable = ({ displayMode, geoJson, stats, selection, setSelection }) => {
    const data = React.useMemo(
        () => {
            let result = []
            let state;
            let row;
            for (let i = 0; i < geoJson.length; i++) {
                row = {}
                row.id = i + 1;
                state = geoJson[i];
                //TODO: add bounds
                row.bounds = 'later'

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
        a = a.cells[1].value.split(',').reduce((a, b) => a + b);
        b = b.cells[1].value.split(',').reduce((a, b) => a + b);
        return parseInt(b) - parseInt(a);
    }

    const vaccinationSort = (a, b) => {
        let c = a.cells;
        a = parseFloat(a.cells[1].value.split('%').reduce((a, b) => a + b));
        b = parseFloat(b.cells[1].value.split('%').reduce((a, b) => a + b));
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
                Header: 'country',
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

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        allColumns,
    } = useTable({ columns, data }, useSortBy)

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
        <Box sx={{ padding: '1rem'}}>
            <Box>
                <MaUTable {...getTableProps()} >
                    <TableHead >
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        sx={{
                                            textAlign: 'center',
                                            borderBottom: 'solid 1px white',
                                            background: '#181A1B',
                                            color: 'white',
                                            fontSize: '1.0rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? <ArrowDropDownIcon/>
                                                    : <ArrowDropUpIcon/>
                                                : ''}
                                        </span>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <TableCell
                                                {...cell.getCellProps()}
                                                sx={{
                                                    textAlign: ['vaccinationRate', 'covidCase', 'percentByPop'].includes(cell.column.id) ? 'center' : 'left',
                                                    py:'1rem',
                                                    px:'0.5rem',
                                                    borderBottom: 'solid 1px white',
                                                    color: 'white',
                                                    background: '#181A1B',
                                                    fontSize: '0.8rem',
                                                }}
                                            >
                                                {cell.render('Cell')}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </MaUTable>
            </Box>
        </Box>
    )
}

export default CovidTable