import { Toast } from 'primereact/toast'

import { useToastModel } from '@/Resources/hooks/use-toast-modal'
import View from './components/View'
import { Box, CircularProgress } from '@mui/material'
import _ from 'lodash'
import { useDataQuery } from '@/Resources/fetchData/useDataQuery'
import { Button } from 'primereact/button'

export const FootList = () => {
    const { toast } = useToastModel()
    const { data, isFetching, create, isAddLoading } = useDataQuery({ endpoint: 'footstat' })

    if (_.isEmpty(data)) {
        return (
            <Box justifyContent='center' display='flex' alignItems='center' height='100vh'>
                <Button onClick={() => create({ data: {} })}>update</Button>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <div className='flex flex-col'>
            <Button onClick={() => create({ data: {} })} loading={isAddLoading}>
                update
            </Button>
            <View data={data} isProgress={isFetching} />
            <Toast ref={toast} position='bottom-right' />
        </div>
    )
}
