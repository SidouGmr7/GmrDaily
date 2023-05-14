import { ListItemText, List } from "@mui/material"
import { Checkbox } from "primereact/checkbox"
import { CheckboxListProps } from "../../types/types"
import { MdOutlineBookmarkRemove } from "react-icons/md"
import { ImStatsDots } from "react-icons/im"

import { InputText } from "primereact/inputtext"
import { useEffect, useState } from "react"
import ReactLoading from "react-loading"

export const CheckboxList = ({
    checkList,
    lineThrough = false,
    handleAction,
    isChecked,
    canAdd = false,
    canRemove = false,
    isFetching = false,
    showState,
}: CheckboxListProps) => {
    const [value, setvalue] = useState("")
    const [loading, setLoading] = useState("")
    useEffect(() => {
        !isFetching && setLoading("")
    }, [])
    return (
        <div>
            {checkList?.map((item, index) => (
                <div key={index} className='flex flex-row items-center justify-between relative'>
                    <List className='inline-flex items-center'>
                        <Checkbox
                            onChange={() => {
                                handleAction("update", item.id, item)
                                setLoading(item.id)
                            }}
                            id={item.id}
                            checked={isChecked(item)}
                            className=''
                        />
                        <ListItemText
                            className={`ml-10 transition-all duration-500 ${
                                isChecked(item) && lineThrough && "line-through text-gray-400"
                            }`}
                            primary={item.name}
                        />
                    </List>
                    {isFetching && item.id === loading && (
                        <ReactLoading
                            type='spin'
                            color='#6366f1'
                            height={20}
                            width={20}
                            className='absolute left-[10%]'
                        />
                    )}
                    <div className='flex gap-8'>
                        {canRemove && (
                            <MdOutlineBookmarkRemove
                                className='cursor-pointer text-2xl text-[#6366f1] hover:text-rose-800'
                                onClick={() => {
                                    handleAction("remove", item.id)
                                    setLoading(item.id)
                                }}
                            />
                        )}
                        {!!showState && (
                            <ImStatsDots
                                className='cursor-pointer text-xl text-[#6366f1] hover:text-gray-800'
                                onClick={() => {
                                    showState(item)
                                }}
                            />
                        )}
                    </div>
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
                                    style={{ width: "100%", height: "40px" }}
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
