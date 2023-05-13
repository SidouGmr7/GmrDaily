import { CheckboxList } from "../../Resources/Components/Checkbox/CheckboxList"
import { useCRUD } from "../../hooks/useCRUD"
import moment from "moment"

export const DailyList = (props: any) => {
    const { data, refetch, isFetching, updateData, addData, deleteData } = useCRUD()
    const handleAction = async (type: string, id: string, data?: any) => {
        try {
            switch (type) {
                case "update":
                    await updateData(id, {
                        date: moment().format("YYYY-MM-DD"),
                        checked: !data?.checked,
                        type: props.taskType,
                    })
                    break
                case "add":
                    await addData({
                        name: data,
                        date: moment().format("YYYY-MM-DD"),
                        checked: !data?.checked,
                        type: props.taskType,
                    })
                    break
                case "remove":
                    await deleteData(id)
                    break
                default:
                    alert(`please chose the right actions ... your action is: ${type}`)
            }
            refetch()
        } catch (error) {
            refetch()
        }
    }
    return (
        <div className='flex flex-col items-center md:py-28 py-10'>
            <div className='text-4xl pb-10'>My CheckList:</div>
            <CheckboxList
                lineThrough
                checkList={data?.filter((item: any) => item.type === props.taskType)}
                isChecked={data?.filter((item: any) => item.checked).map((item: any) => item.id)}
                handleAction={handleAction}
                isFetching={isFetching}
                canAdd
                canRemove
            />
        </div>
    )
}
