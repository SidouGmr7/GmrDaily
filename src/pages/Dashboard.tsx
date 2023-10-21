import { sideBarLink } from '../Routes'
import { useLocation } from 'react-router-dom'
import { Layout } from '../Resources/layout'
import { Paper } from '@mui/material'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@mui/material'

const container = {
    show: {
        transition: {
            staggerChildren: 0.5,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
}

export const Dashboard = () => {
    const isMobile = useMediaQuery('(max-width:600px)')
    const path = useLocation().pathname
    return (
        <Layout
            childrenStyle={(collapsed) => {
                return `${
                    collapsed ? 'px-[2%]' : 'pl-[22%] pr-[2%]'
                } pt-[6%] pb-[2%] transition-all duration-500`
            }}
            sideBarListItem={sideBarLink}
            navBarListItem={sideBarLink}
            defaultHideSideBar={true || isMobile}
        >
            {sideBarLink.map(({ components, link }, index) => {
                if (path === link)
                    return (
                        <motion.div
                            variants={container}
                            initial='hidden'
                            animate='show'
                            key={index}
                        >
                            <Paper
                                component={motion.div}
                                variants={item}
                                style={{ borderRadius: 40 /*backgroundColor: '#111827'*/ }}
                            >
                                <div className='py-10 md:px-32'>{components}</div>
                            </Paper>
                        </motion.div>
                    )
                else return null
            })}
            {path === '/dashboard' && <div>this is a dashboad</div>}
        </Layout>
    )
}
