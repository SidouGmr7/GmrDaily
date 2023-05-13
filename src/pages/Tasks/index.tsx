import { DailyList } from "./DailyList"
import { TabView, TabPanel } from "primereact/tabview"
import { useCRUD } from "../../hooks/useCRUD"
import _ from "lodash"
import { useEffect, useState } from "react"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"

export const Tasks = () => {
    const { data } = useCRUD()
    const [types, setTypes] = useState<any>([])
    const [value, setvalue] = useState("")

    useEffect(() => {
        if (data) {
            setTypes([...new Set(data?.map((item: any) => item.type))])
        }
    }, [data])

    const AdditionalTab = () => {
        const [openInput, setOpenInput] = useState(false)

        return (
            <div className='flext items-center  mt-2'>
                {openInput && (
                    <InputText
                        style={{ width: "80px", height: "32px" }}
                        value={value}
                        onChange={(e) => setvalue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                if (value) {
                                    setTypes([...types, value])
                                    setvalue("")
                                    setOpenInput(false)
                                }
                            }
                        }}
                    />
                )}{" "}
                <Button
                    label={openInput ? "-" : "+"}
                    className='w-4 h-8 flex justify-center'
                    onClick={() => setOpenInput(!openInput)}></Button>
            </div>
        )
    }

    return (
        <TabView>
            {types?.map((tab: any) => (
                <TabPanel header={tab}>
                    <DailyList taskType={tab} />
                </TabPanel>
            ))}
            <TabPanel headerTemplate={AdditionalTab}></TabPanel>
        </TabView>
    )
}
