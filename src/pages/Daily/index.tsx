import { useState } from 'react'
import { DailyList } from './DailyList'
// import { DailyStat } from './DailyStat'
import { TabView, TabPanel } from 'primereact/tabview'

export const Daily = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} scrollable>
            <TabPanel header='Daily List'>
                <DailyList /*setActiveIndex={setActiveIndex} />
            </TabPanel>
            <TabPanel header='Daily Stat' disabled>
                <DailyStat /*dataStat={dataStat}*/
                />
            </TabPanel>
        </TabView>
    )
}
