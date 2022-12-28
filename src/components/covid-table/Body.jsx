import { TableRow, TableBody, TableCell } from '@material-ui/core'
import { useRef,useState } from 'react'

const Body = ({ rows, prepareRow, getTableBodyProps, focusRegion, setFocusRegion, }) => {
    const tableRef = useRef(null)
    const [pointerStartCords, setPointerStartCords] = useState({ x: 0, y: 0 })

    const isSelectedRow = (row) => {
        if (row.original.country === focusRegion.name && tableRef?.current) {
            const selectedRow = (
                [...tableRef?.current?.children].find(
                    (row) => row.children[0].innerText === focusRegion.name
                )
            );
            selectedRow?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        return row.original.country === focusRegion.name;
    }

    const downHandler = (row) => {
        setFocusRegion({ name: row.values.country })
    }

    return (
        <TableBody {...getTableBodyProps()} ref={tableRef} >
            {rows.map((row, idx) => {
                prepareRow(row)
                return (
                    <TableRow
                        {...row.getRowProps()}
                        onPointerDown={(e) => {
                            setPointerStartCords({ x: e.clientX, y: e.clientY })
                            e.stopPropagation()
                        }}
                        onPointerUp={(e) => {
                            e.stopPropagation()
                            if (Math.abs(e.clientX - pointerStartCords.x) < 10 && Math.abs(e.clientY - pointerStartCords.y) < 10)
                                downHandler(row)
                        }}
                    >
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
                                        background: isSelectedRow(row) ? 'orange' : '#181A1B',
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