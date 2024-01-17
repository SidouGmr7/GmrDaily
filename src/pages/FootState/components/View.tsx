// @ts-nocheck

import { useState } from 'react'
import { Box } from '@mui/material'

import { SearchBar } from './SearchBar'
import { useSearchData } from '@/Resources/hooks/useSearchData'
import { TableData } from './TableData'

export const View = ({ data: newdata }: any) => {
    const data = newdata.map((obj) => {
        return {
            name: obj.name,
            id: obj.id,
            country: obj.country.name,
            match: obj.country.match,
            goals: obj.country.goals,
            ratio: obj.country.ratio,
            start: obj.country.start,
        }
    })

    const [currentPage, setCurrentPage] = useState(0)
    const { filteredData, handleNameSearch, handlePowerSearch, powerSearch, setNameSearch } =
        useSearchData({ data, setCurrentPage })

    const headColumn = [...Object.keys(data[0])]
    console.log('headColumn: ', headColumn)

    return (
        <Box p={{ xs: 2, sm: 5 }} mr='auto' ml='auto' width={{ xs: 'unset', sm: '80%' }}>
            <SearchBar
                filteredData={filteredData}
                handleNameSearch={handleNameSearch}
                handlePowerSearch={handlePowerSearch}
                powerSearch={powerSearch}
                setNameSearch={setNameSearch}
            />
            <TableData
                filteredData={filteredData}
                headColumn={headColumn}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </Box>
    )
}

export default View
