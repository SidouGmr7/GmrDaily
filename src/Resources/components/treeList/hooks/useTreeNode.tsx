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
    const { addData, deleteData, refetch } = useFirebase({
        condition: { useSubCollection: true },
    })
    const [nodeToRemoved, setNodeToRemoved] = useState('')
    const [openTextField, setOpenTextField] = useState(false)

    const onSubmit = (newNodeLabel: string, onSeccuss: () => void) => {
        removeActionElement(parent)
        const newNode = generateNode({ newNodeLabel, parent })
        const values = {
            data: newNode,
            colRef:
                parent.id?.length === 1
                    ? `${col}/${parent.id}/${subCol}`
                    : `${col}/${Math.floor((parent.id as any) / 10)}/${subCol}/${
                          parent.id
                      }/${subCol}`,
            customDocId: newNode.key,
        }
        addData.mutateAsync(values).then(() => {
            onSeccuss()
        })
    }

    const removeNode = (e: any) => {
        e.stopPropagation()
        setNodeToRemoved(node.id || '')
        deleteData.mutateAsync({
            colRef: `${col}/${Math.floor((parent.id as any) / 10)}/${subCol}/${
                parent.id
            }/${subCol}/${node.id}`,
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
        key = head.length ? Number(head[head.length - 1].key) + 1 : 1
    }
    if (parent) {
        if (parent.children?.length) {
            key = Number(parent?.children[parent.children?.length - 1].key) + 1
        } else {
            key = Number(parent?.key) * 10 + 1
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
