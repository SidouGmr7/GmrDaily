import { DailyList } from "./DailyList"
import { DailyStat } from "./DailyStat"
import { TabView, TabPanel } from "primereact/tabview"

export const Daily = () => {
    return (
        <TabView>
            <TabPanel header='Daily List'>
                <DailyList />
            </TabPanel>
            <TabPanel header='Daily Stat'>
                <DailyStat />
            </TabPanel>
        </TabView>
    )
}
