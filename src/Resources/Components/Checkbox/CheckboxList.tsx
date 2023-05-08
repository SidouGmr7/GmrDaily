import { ListItemText, List } from "@mui/material"
import { Checkbox } from "primereact/checkbox"
import { CheckboxListProps } from "../../types/type"
import { MdOutlineBookmarkRemove } from "react-icons/md"
import { InputText } from "primereact/inputtext"
import { useState } from "react"
import ReactLoading from "react-loading"

export const CheckboxList = ({
    checkList,
    lineThrough = false,
    handleAction,
    isChecked,
    canAdd = false,
    canRemove = false,
    isFetching = false,
}: CheckboxListProps) => {
    const [value, setvalue] = useState("")
    return (
        <div>
            {checkList.map((item, index) => (
                <div key={index} className='flex flex-row items-center justify-between'>
                    <List className='inline-flex items-center'>
                        <Checkbox
                            onChange={() => handleAction("update", item.id, item)}
                            id={item.id}
                            checked={isChecked.includes(item.id)}
                        />
                        <ListItemText
                            className={`ml-10 transition-all duration-500 ${
                                isChecked.includes(item.id) && lineThrough && "line-through text-gray-400"
                            }`}
                            primary={item.name}
                        />
                    </List>
                    {canRemove && (
                        <MdOutlineBookmarkRemove
                            className='cursor-pointer text-2xl text-[#6366f1] hover:text-rose-800'
                            onClick={() => handleAction("remove", item.id)}
                        />
                    )}
                </div>
            ))}
            <div className="flex flex-row">
            {/* {isFetching && (
                <ReactLoading type='spin' color='#6366f1' height={20} width={20} className="ml-10" />
            )} */}
                {canAdd && (
                    <List className='inline-flex items-center'>
                        <ListItemText
                            className='ml-10 transition-all duration-500 text-gray-500'
                            primary={
                                <InputText
                                    style={{ width: "160px", height: "40px" }}
                                    value={value}
                                    onChange={(e) => setvalue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            if (value) {
                                                handleAction("add", "0", value)
                                                setvalue("")
                                            }
                                        }
                                    }}
                                />
                            }
                        />
                    </List>
                )}
            </div>
        </div>
    )
}
