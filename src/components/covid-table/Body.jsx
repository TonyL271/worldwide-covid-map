import { TableRow, TableBody, TableCell } from '@material-ui/core'

const Body = ({ rows, prepareRow, getTableBodyProps }) => {
    return (
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
                                        py: '1rem',
                                        px: '0.5rem',
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
    )
}

export default Body