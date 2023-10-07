import { CheckboxList } from "../../Resources/Components/Checkbox/CheckboxList"
import { CheckList } from "../../Resources/types/types"
import moment from "moment"

export const DailyList = (props: any) => {
    // const { data, refetch, isFetching, updateData, addData, deleteData } = useCRUD()
    // const handleAction = async (type: string, id: string, data?: any) => {
    //     try {
    //         switch (type) {
    //             case "update":
    //                 await updateData(id, {
    //                     date: moment().format("YYYY-MM-DD"),
    //                     checked: !data?.checked,
    //                     type: props.taskType,
    //                 })
    //                 break
    //             case "add":
    //                 await addData({
    //                     name: data,
    //                     date: moment().format("YYYY-MM-DD"),
    //                     checked: false,
    //                     type: props.taskType,
    //                 })
    //                 break
    //             case "remove":
    //                 await deleteData(id)
    //                 break
    //             default:
    //                 alert(`please chose the right actions ... your action is: ${type}`)
    //         }
    //         refetch()
    //     } catch (error) {
    //         refetch()
    //     }
    // }
    return (
        <div className='flex flex-col py-10'>
        <div className='text-xl pb-4 -mt-10 text-gray-500'>My CheckList:</div>
            {/* <CheckboxList
                lineThrough
                checkList={data?.filter((item: any) => item.type === props.taskType)}
                isChecked={(item: CheckList) => item?.checked}
                handleAction={handleAction}
                isFetching={isFetching}
                canAdd
                canRemove
            /> */}
        </div>
    )
}
