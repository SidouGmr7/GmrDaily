import { useFirebase } from "../../Resources/firebase/hooks/useFirebase"
import moment from "moment"
import TreeList from '../../Resources/components/treeList/TreeList'
export const DailyList = (props: any) => {
    // const { data, refetch, isFetching, updateData, addData, deleteData } = useFirebase()
    // const handleAction = async (type: string, id: string, data?: any) => {
    
    // }
    return (
        <div className='flex flex-col py-10'>
            <div className='text-xl pb-4 -mt-10 text-gray-500'>My List:</div>
            <TreeList />
        </div>
    )
}



