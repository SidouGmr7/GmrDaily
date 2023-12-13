import { Toast } from 'primereact/toast'

import { useToastModel } from '@/Resources/hooks/use-toast-modal'
import TreeList from '@/Resources/components/TreeList'

export const DailyList = () => {
    const { toast } = useToastModel()

    return (
        <div className='flex flex-col'>
            <TreeList />
            <Toast ref={toast} position='bottom-right' />
        </div>
    )
}
