// import { Daily } from './pages/Daily'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom'
import { Tasks } from './pages/Tasks'
import FootState from './pages/FootState'
import { AccessAlarm } from '@mui/icons-material'

export const sideBarLink = [
    // {
    //     title: 'Daily',
    //     components: <Daily />,
    //     link: '/dashboard/daily',
    //     icon: <ThreeDRotation className='text-gray-400 hover:text-white' />,
    // },
    {
        title: 'Tasks',
        components: <Tasks />,
        link: '/dashboard/tasks',
        icon: <AccessAlarm className='text-gray-400 hover:text-white' />,
    },
]

export const sideBarLinkFootState = [
    {
        title: 'Country',
        components: <FootState />,
        link: '/footstat/country',
        icon: <AccessAlarm className='text-gray-400 hover:text-white' />,
    },
]

function Routes() {
    return (
        <div className='overflow-hidden'>
            <Router>
                <Switch>
                    <Route path='/dashboard' element={<Dashboard />}>
                        {sideBarLink.map(({ components, link }, index) => (
                            <Route key={index} path={link} element={components} />
                        ))}
                    </Route>
                    <Route path='/footstat' element={<Dashboard />}>
                        {sideBarLinkFootState.map(({ components, link }, index) => (
                            <Route key={index} path={link} element={components} />
                        ))}
                    </Route>
                    <Route path='/' element={<Home />} />
                </Switch>
            </Router>
        </div>
    )
}

export default Routes
