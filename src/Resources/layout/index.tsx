import { useState } from "react"
import { Navbar } from "./Components/Navbar"
import { Sidebar } from "./Components/Sidebar"
import { LayoutProps } from "../types/types"

export const Layout = ({
    children,
    navBar = true,
    sideBar = true,
    defaultHideSideBar = false,
    sideBarStyle = "",
    sideBarColor = "",
    navBarColor = "",
    navBarStyle = "",
    navBarListItem = [],
    sideBarListItem = [],
    childrenStyle = (collapsed) => {
        return `${collapsed ? "pl-[2%]" : "pl-[22%]"} pt-[6%] pb-[2%]`
    },
}: LayoutProps) => {
    const [collapsed, setCollapsed] = useState(defaultHideSideBar)

    const collapsedSideBar = () => {
        setCollapsed((collapsed) => !collapsed)
    }

    return (
        <div>
            {sideBar && (
                <Sidebar
                    sideBarStyle={sideBarStyle}
                    sideBarColor={sideBarColor}
                    collapsedSideBar={collapsedSideBar}
                    sideBarListItem={sideBarListItem}
                    collapsed={collapsed}
                />
            )}
            {navBar && (
                <Navbar
                    navBarColor={navBarColor}
                    navBarStyle={navBarStyle}
                    collapsed={collapsed}
                    collapsedSideBar={collapsedSideBar}
                    navBarListItem={navBarListItem}
                />
            )}
            <div className={typeof childrenStyle == "function" ? childrenStyle(collapsed) : childrenStyle}>
                {children}
            </div>
        </div>
    )
}
