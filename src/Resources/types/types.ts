import { ReactElement, ReactNode } from "react"
import { SvgIconProps } from "@mui/material"


export type Routes = {
    title: string
    components: ReactElement
    link: string
    icon: ReactElement<SvgIconProps>
}

export type LayoutProps = {
    children: ReactNode
    navBar?: boolean
    sideBar?: boolean
    sideBarStyle?: string
    sideBarColor?: string
    navBarColor?: string
    navBarStyle?: string
    defaultHideSideBar?: boolean
    navBarListItem?: Routes[]
    sideBarListItem: Routes[]
    childrenStyle?: string | ((collapsed: boolean) => string)
}

export type NavBarProps = {
    navBarColor: string
    navBarStyle: string
    collapsedSideBar: () => void
    collapsed: boolean
    navBarListItem: Routes[]
}

export type SideBarProps = {
    sideBarColor: string
    sideBarStyle: string
    collapsedSideBar: () => void
    collapsed: boolean
    sideBarListItem: Routes[]
}