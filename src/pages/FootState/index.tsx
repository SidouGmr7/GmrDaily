import { useState } from 'react'
import { FootList } from './FootList'
// import { DailyStat } from './DailyStat'
import { TabView, TabPanel } from 'primereact/tabview'

const FootState = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} scrollable>
            <TabPanel header='Foot List'>
                <FootList /*setActiveIndex={setActiveIndex} />
            </TabPanel>
            <TabPanel header='Daily Stat' disabled>
                <DailyStat /*dataStat={dataStat}*/
                />
            </TabPanel>
        </TabView>
    )
}


export default FootState