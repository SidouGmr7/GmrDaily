import {
    TreeCheckboxSelectionKeys,
    TreeMultipleSelectionKeys,
    TreeNodeTemplateOptions,
    TreeProps,
} from 'primereact/tree'
import { TreeNode as defaultTreeNode } from 'primereact/treenode'

export type ChekBookNodes = string | TreeMultipleSelectionKeys | TreeCheckboxSelectionKeys | null

export type TreeNode = defaultTreeNode & {
    children?: TreeNode[] | undefined
    action?: string
    length?: number
}

export type NodeTemplateProps = {
    node: TreeNode
    options: Options
}

export type Options = TreeNodeTemplateOptions & {
    props: TreeProps & {
        parent: TreeNode
    }
}
