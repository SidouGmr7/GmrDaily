import { Link } from "react-router-dom"
import { Paper, List, ListItemButton, ListItemText } from "@mui/material"
import { RiMenuUnfoldLine } from "react-icons/ri"
import { NavBarProps } from "../../types/type"

export function Navbar({
    collapsedSideBar,
    collapsed,
    navBarStyle,
    navBarColor,
    navBarListItem,
}: NavBarProps) {
    return (
        <Paper
            square
            elevation={3}
            className='h-16'
            style={{
                backgroundColor: navBarColor || "#111827",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                position: "fixed",
                top: 0,
                left: `${collapsed ? 0 : "20%"}`,
                right: 0,
                zIndex: 998,
                transition: "all 500ms ease-in-out",
            }}>
            {collapsed ? (
                <div className='p-6 text-xl justify-end flex cursor-pointer'>
                    <RiMenuUnfoldLine color='white' onClick={collapsedSideBar} />
                </div>
            ) : (
                <div></div>
            )}
            <List sx={{ display: "flex", flexDirection: "row" }}>
                {navBarListItem.map(({ title, link }, index) => (
                    <div
                        key={index}
                        className={
                            navBarStyle ||
                            "transition-all duration-200  hover:bg-slate-800 hover:rounded-md text-gray-400 hover:text-white"
                        }>
                        <Link to={link}>
                            <ListItemButton>
                                <ListItemText primary={title} />
                            </ListItemButton>
                        </Link>
                    </div>
                ))}
            </List>
        </Paper>
    )
}
