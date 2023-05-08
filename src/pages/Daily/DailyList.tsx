import { CheckboxList } from "../../Resources/Components/Checkbox/CheckboxList"
import { useCRUD } from "../../hooks/useCRUD"
import moment from "moment"

export const DailyList = () => {
    const { data, refetch, isFetching, updateData, addData, deleteData } = useCRUD()
    const handleAction = async (type: string, id: string, data?: any) => {
        try {
            if (type === "update") {
                await updateData(id, {
                    checked: [
                        {
                            date: moment().format("YYYY-MM-DD"),
                            isChecked: !data.checked[0].isChecked,
                        },
                    ],
                })
            }
            if (type === "add") {
                await addData({
                    name: data,
                    checked: [
                        {
                            isChecked: false,
                        },
                    ],
                })
            }
            if (type === "remove") {
                await deleteData(id)
            }
            refetch()
        } catch (error) {
            refetch()
        }
    }

    return (
        <div className='flex flex-col items-center md:py-28 py-10'>
            <div className='text-4xl pb-10'>My CheckList:</div>
            {data && (
                <CheckboxList
                    lineThrough
                    checkList={data}
                    isChecked={data
                        ?.filter((item: any) =>
                            item.checked.find(
                                (check: any) =>
                                    check.date === moment().format("YYYY-MM-DD") && check.isChecked
                            )
                        )
                        .map((item: any) => item.id)}
                    handleAction={handleAction}
                    isFetching={isFetching}
                    canAdd
                    canRemove
                />
            )}
        </div>
    )
}
