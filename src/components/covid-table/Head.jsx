import { TableHead,TableRow,TableCell } from '@material-ui/core'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const Head = ({headerGroups}) => {
   return (
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
                              ? <ArrowDropDownIcon sx={{ color: '#e600ff', transform: 'scale(1.5)' }} />
                              : <ArrowDropUpIcon sx={{ color: '#e600ff', transform: 'scale(1.5)' }} />
                           : ''}
                     </span>
                  </TableCell>
               ))}
            </TableRow>
         ))}
      </TableHead>
   )
}

export default Head