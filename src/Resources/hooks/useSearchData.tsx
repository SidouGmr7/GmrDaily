// @ts-nocheck

import { useState } from 'react'

// import { calculatePower } from '../utils'

export const useSearchData = ({ data, setCurrentPage }) => {
    const [nameSearch, setNameSearch] = useState(null)
    const [powerSearch, setPowerSearch] = useState(null)

    const filteredData = data?.filter(
        (pokemon) => pokemon.name.toLowerCase().includes(nameSearch?.toLowerCase()) || !nameSearch
    )
    // .filter((pokemon) => calculatePower(pokemon) >= parseInt(powerSearch, 10) || !powerSearch)

    const handleNameSearch = (event) => {
        setNameSearch(event.target.value)
        setCurrentPage(0)
    }

    const handlePowerSearch = (event) => {
        setPowerSearch(event.target.value)
        setCurrentPage(0)
    }

    return {
        filteredData,
        handleNameSearch,
        handlePowerSearch,
        powerSearch,
        setNameSearch,
    }
}
