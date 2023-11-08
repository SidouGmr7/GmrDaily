import { TreeNode } from '../types'
import { useFirebase } from '../../../firebase/hooks/useFirebase'
import { useContext, useState } from 'react'
import { DefaultCollection, DefaultSubCollection } from '../../../firebase/configs'
import { ToastContext } from '../../../../providers/ToastProvider'

type generateNodeProps = {
    dataNode: DataNodeProps
    head?: TreeNode[]
    parent?: TreeNode
}

const col = DefaultCollection
const subCol = DefaultSubCollection

type UseTreeNodeProps = {
    node: TreeNode
    parent: TreeNode
}

type DataNodeProps = {
    newLableNode: string
    url?: string
}

export const useTreeNode = ({ node, parent }: UseTreeNodeProps) => {
    const { addData, deleteData } = useFirebase({
        condition: { useSubCollection: true },
    })
    const [nodeToRemoved, setNodeToRemoved] = useState('')
    const { handleError } = useContext(ToastContext)

    const onSubmit = (dataNode: DataNodeProps, onSeccuss: () => void) => {
        const newNode = generateNode({ dataNode, parent: node })
        const values = {
            data: newNode,
            colRef: !node.id?.includes('-')
                ? `${col}/${node.id}/${subCol}`
                : `${col}/${node.id.split('-')[0]}/${subCol}/${node.id}/${subCol}`,
            customDocId: newNode.key,
        }
        addData
            .mutateAsync(values)
            .then(() => {
                onSeccuss()
            })
            .catch((error) => {
                handleError(error)
            })
    }

    const removeNode = (e: any, onSeccuss: () => void) => {
        e.stopPropagation()
        setNodeToRemoved(node.id || '')
        const values = {
            colRef: !node.id?.includes('-')
                ? `${col}/${node.id}`
                : !parent.id?.includes('-')
                ? `${col}/${parent.id}/${subCol}/${node.id}`
                : `${col}/${parent.id?.split('-')[0]}/${subCol}/${parent.id}/${subCol}/${node.id}`,
        }
        deleteData
            .mutateAsync(values)
            .then(() => {
                onSeccuss()
            })
            .catch((error) => {
                handleError(error)
            })
    }

    return {
        onSubmit,
        removeNode,
        nodeToRemoved,
    }
}

export const generateNode = ({ dataNode, head, parent }: generateNodeProps) => {
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
        label: dataNode.newLableNode,
        icon: 'pi pi-fw pi-inbox', // to work
        expanded: false,
        ...(parent && parent.id?.length === 1 && { children: [] }),
        ...(dataNode.url && { url: dataNode.url }),
    }

    return generatedNode
}
