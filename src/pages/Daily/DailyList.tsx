import { useContext } from 'react'
import { Toast } from 'primereact/toast'
import { ToastContext } from '../../providers/ToastProvider'
import TreeList from '../../Resources/components/treeList/TreeList'

export const DailyList = () => {
    const { toast } = useContext(ToastContext)

    return (
        <div className='flex flex-col'>
            <TreeList />
            <Toast ref={toast} position='bottom-right' />
        </div>
    )
}
