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
    const [loading, setLoading] = useState("")
    return (
        <div>
            {checkList.map((item, index) => (
                <div key={index} className='flex flex-row items-center justify-between relative'>
                    <List className='inline-flex items-center'>
                        {isFetching && item.id === loading && (
                            <ReactLoading
                                type='spin'
                                color='#6366f1'
                                height={20}
                                width={20}
                                className='absolute left-[40%]'
                            />
                        )}
                        <Checkbox
                            onChange={() => {
                                handleAction("update", item.id, item)
                                setLoading(item.id)
                            }}
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
                            onClick={() => {
                                handleAction("remove", item.id)
                                setLoading(item.id)
                            }}
                        />
                    )}
                </div>
            ))}
            <div className='flex flex-row relative'>
                {isFetching && !loading && (
                    <ReactLoading
                        type='spin'
                        color='#6366f1'
                        height={20}
                        width={20}
                        className='absolute bottom-[40%]'
                    />
                )}
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
                                                setLoading("")
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
