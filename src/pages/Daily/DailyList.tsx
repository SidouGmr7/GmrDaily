import { CheckboxList } from "../../Resources/Components/Checkbox/CheckboxList"
import { useCRUD } from "../../hooks/useCRUD"
import moment from "moment"

export const DailyList = (props: any) => {
    const { data, refetch, isFetching, updateData, addData, deleteData } = useCRUD()
    const handleAction = async (type: string, id: string, data?: any) => {
        try {
            switch (type) {
                case "update":
                    const checked = data?.checked?.find(
                        (check: any) => check.date == moment().format("YYYY-MM-DD")
                    )
                    await updateData(id, {
                        checked: [
                            {
                                date: moment().format("YYYY-MM-DD"),
                                isChecked: checked === undefined ? true : !checked.isChecked,
                            },
                        ],
                    })
                    break
                case "add":
                    await addData({
                        name: data,
                        checked: [
                            {
                                isChecked: false,
                            },
                        ],
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
    const isChacked = data
        ?.filter((item: any) =>
            item.checked.find((check: any) => check.date === moment().format("YYYY-MM-DD") && check.isChecked)
        )
        .map((item: any) => item.id)

    return (
        <div className='flex flex-col py-10'>
            <div className='text-xl pb-4 -mt-10 text-gray-500'>My CheckList:</div>
            {data && (
                <CheckboxList
                    lineThrough
                    checkList={data}
                    isChecked={isChacked}
                    handleAction={handleAction}
                    isFetching={isFetching}
                    canAdd
                    canRemove
                    showState={(item: any) => {
                        props.setActiveIndex(1)
                        props.setDataStat(item)
                    }}
                />
            )}
        </div>
    )
}
