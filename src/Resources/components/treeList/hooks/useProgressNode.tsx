import { TreeNode } from '../types'
import { useEffect, useState } from 'react'
import _ from 'lodash'

type UseProgressNodeProps = {
    node: TreeNode
    selectionKeys: any
}

export const useProgressNode = ({ node, selectionKeys }: UseProgressNodeProps) => {
    const [progress, setProgress] = useState<any>(0)

    useEffect(() => {
        setProgress(0)
        if (node.children?.length && selectionKeys) {
            node.children.forEach((child) => {
                if (child.key && selectionKeys[child.key]?.checked) {
                    const children = node.children as TreeNode[]
                    setProgress((prev: any) => {
                        return prev + 1 / children.length
                    })
                }
            })
        }
        if (_.isEmpty(node.children) && node.key && selectionKeys) {
            const key = node.key
            setProgress(() => {
                return selectionKeys[key]?.checked ? 1 : 0
            })
        }
    }, [JSON.stringify(selectionKeys)])

    return { progress: progress.toFixed(2) * 100 }
}
