// @ts-nocheck
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    styled,
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'

import { usePagination } from '@/Resources/hooks/usePagination'

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#f4f6f8',
        color: '#697986',
        padding: '8px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: '#515861',
    },
}))

export const TableData = ({ filteredData, headColumn, currentPage, setCurrentPage }) => {
    const { currentItems, onPageChange, handleChangeRowsPerPage, rowsPerPage } = usePagination({
        filteredData,
        setCurrentPage,
        currentPage,
    })

    return (
        <TableContainer
            component={Paper}
            sx={{
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: 5,
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='center'>c</StyledTableCell>
                        {headColumn.map((head, index) => (
                            <StyledTableCell align='center' key={index}>
                                {head}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentItems.map((pokemon, index) => (
                        <TableRow key={pokemon.id}>
                            <StyledTableCell align='center'>{index + 1}</StyledTableCell>
                            {Object.values(pokemon).map((value, index) => (
                                <StyledTableCell align='center' key={index}>
                                    {value}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component='div'
                count={filteredData.length}
                page={currentPage}
                onPageChange={onPageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    )
}
