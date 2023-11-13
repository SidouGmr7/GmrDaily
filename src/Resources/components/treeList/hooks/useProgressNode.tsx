import { useEffect, useState } from 'react'
import _ from 'lodash'

import { TreeNode } from '../types'

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
                const checked = child.key && selectionKeys[child.key]?.checked
                const partialChecked = child.key && selectionKeys[child.key]?.partialChecked
                if (checked || partialChecked) {
                    const children = node.children as TreeNode[]
                    setProgress((prev: any) => {
                        return prev + (checked ? 1 : 0.5) / children.length
                    })
                }
            })
        }
        if (_.isEmpty(node.children) && node.key && selectionKeys) {
            const key = node.key
            setProgress(!!selectionKeys[key]?.checked)
        }
    }, [JSON.stringify(selectionKeys)])

    return { progress: (progress * 100).toFixed(0) }
}
