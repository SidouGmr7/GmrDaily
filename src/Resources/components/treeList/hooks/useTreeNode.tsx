import { TreeNode } from '../types'
import { useFirebase } from '../../../firebase/hooks/useFirebase'
import { useState } from 'react'
import { DefaultCollection, DefaultSubCollection } from '../../../firebase/configs'

type generateNodeProps = {
    newNodeLabel: string
    head?: TreeNode[]
    parent?: TreeNode
}

const col = DefaultCollection
const subCol = DefaultSubCollection

type UseTreeNodeProps = {
    node: TreeNode
    parent: TreeNode
}

export const useTreeNode = ({ node, parent }: UseTreeNodeProps) => {
    const { addData, deleteData } = useFirebase({
        condition: { useSubCollection: true },
    })
    const [nodeToRemoved, setNodeToRemoved] = useState('')
    const [openTextField, setOpenTextField] = useState(false)

    const onSubmit = (newNodeLabel: string, onSeccuss: () => void) => {
        removeActionElement(parent)
        const newNode = generateNode({ newNodeLabel, parent })
        const values = {
            data: newNode,
            colRef: !parent.id?.includes('-')
                ? `${col}/${parent.id}/${subCol}`
                : `${col}/${parent.id.split('-')[0]}/${subCol}/${parent.id}/${subCol}`,
            customDocId: newNode.key,
        }
        addData.mutateAsync(values).then(() => {
            onSeccuss()
        })
    }

    const removeNode = (e: any, onSeccuss: () => void) => {
        e.stopPropagation()
        setNodeToRemoved(node.id || '')
        deleteData
            .mutateAsync({
                colRef: `${col}/${parent.id?.split('-')[0]}/${subCol}/${parent.id}/${subCol}/${
                    node.id
                }`,
            })
            .then(() => {
                onSeccuss()
            })
    }

    const toggleNode = (e: any) => {
        e.stopPropagation()
        node.expanded = !node.expanded
        setOpenTextField(node.expanded)
        if (node.expanded) {
            node.children?.push({
                action: 'add',
            })
        } else if (node?.children?.length && node.children[node.children?.length - 1].action) {
            node.children?.pop()
        }
    }

    return {
        onSubmit,
        openTextField,
        removeNode,
        nodeToRemoved,
        toggleNode,
    }
}

export const generateNode = ({ newNodeLabel, head, parent }: generateNodeProps) => {
    let key
    if (head) {
        key = head.length ? String(Number(head[head.length - 1].key) + 1) : '1'
    }
    if (parent) {
        if (parent.children?.length) {
            const precChildKey = parent?.children[parent.children?.length - 1].key as string
            const parts = precChildKey?.split('-')
            const precKey = parts[parts.length - 1]
            key = `${parent?.key}-${Number(precKey) + 1}`
        } else {
            key = `${parent?.key}-1`
        }
    }
    const generatedNode = {
        key,
        label: newNodeLabel,
        icon: 'pi pi-fw pi-inbox', // to work
        expanded: false,
        ...(parent && parent.id?.length === 1 && { children: [] }),
    }

    return generatedNode
}

export const removeActionElement = (parent: TreeNode) => parent?.children?.pop()

// export const addChildToParent = (newNode: string, parent: TreeNode) => {
//     const newChild = generateNode(newNode)
//     parent?.children?.push(newChild)
// }
