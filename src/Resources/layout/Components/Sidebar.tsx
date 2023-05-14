import { Paper, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { RiMenuFoldLine } from "react-icons/ri"
import { SideBarProps } from "../../types/types"

export const Sidebar = ({
    collapsedSideBar,
    sideBarStyle,
    sideBarColor,
    sideBarListItem,
    collapsed,
}: SideBarProps) => {
    const { pathname } = useLocation()

    return (
        <Paper
            square
            elevation={3}
            style={{
                backgroundColor: sideBarColor || "#111827",
                position: "fixed",
                zIndex: 999,
                top: 0,
                bottom: 0,
                transform: collapsed ? "translateX(-100%)" : "translateX(0%)",
                transition: "all 500ms ease-in-out",
            }}
            className={"md:w-[20%]"}>
            <div className='p-6 text-xl justify-end flex cursor-pointer'>
                <RiMenuFoldLine color='white' onClick={collapsedSideBar} />
            </div>
            <List>
                {sideBarListItem.map(({ title, link, icon }, index) => (
                    <div
                    key={index}
                        className={
                            sideBarStyle ||
                            `transition-all duration-200 m-2  ${
                                pathname === link
                                    ? "bg-slate-700 text-white rounded-md"
                                    : "hover:bg-slate-800 hover:rounded-md text-gray-400 hover:text-white"
                            }`
                        }>
                        <Link to={link}>
                            <ListItemButton>
                                <ListItemIcon> {icon}</ListItemIcon>
                                <ListItemText primary={title} />
                            </ListItemButton>
                        </Link>
                    </div>
                ))}
            </List>
        </Paper>
    )
}
