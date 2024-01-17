import { TextField, Grid, Autocomplete } from '@mui/material'
import _ from 'lodash'

export const SearchBar = (props: any) => {
    const { filteredData, handleNameSearch, handlePowerSearch, powerSearch, setNameSearch } = props

    // const minPower = !_.isEmpty(filteredData)
    //     ? Math.min(...filteredData.map((pokemon) => calculatePower(pokemon)))
    //     : 0

    // const maxPower = !_.isEmpty(filteredData)
    //     ? Math.max(...filteredData.map((pokemon) => calculatePower(pokemon)))
    //     : 0

    return (
        <Grid
            style={{
                padding: 10,
                borderRadius: 20,
                marginBottom: '1rem',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={filteredData.map((item: any) => item.name)}
                        onChange={(event, newValue) => {
                            event.preventDefault
                            setNameSearch(newValue)
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Search...'
                                fullWidth
                                onChange={handleNameSearch}
                                size='small'
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label='Power threshold'
                        value={powerSearch}
                        onChange={handlePowerSearch}
                        fullWidth
                        size='small'
                    />
                </Grid>
            </Grid>
            {/* <Grid mt={2} spacing={2}>
                <Typography variant='body2' color='textSecondary'>
                    Min Power: {minPower}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                    Max Power: {maxPower}
                </Typography>
            </Grid> */}
        </Grid>
    )
}
