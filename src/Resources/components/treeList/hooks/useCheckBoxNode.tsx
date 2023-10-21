import { CheckBoxNodes, TreeNode } from '../types'
import { useEffect, useState } from 'react'
import { fetchSingleData, useFirebase } from '../../../../Resources/firebase/hooks/useFirebase'

type UseCheckBoxNodeProps = {
    node?: TreeNode
    selectionKeys?: any
}

export const useCheckBoxNode = ({ node, selectionKeys }: UseCheckBoxNodeProps) => {
    const { updateData } = useFirebase({ condition: { useSubCollection: true } })
    const [selectedKeys, setSelectedKeys] = useState<CheckBoxNodes>(null)
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        if (selectionKeys && node?.key) {
            setIsChecked(selectionKeys[node.key]?.checked)
        }
    }, [JSON.stringify(selectionKeys)])

    useEffect(() => {
        const fetchCheckBoxData = async () => {
            const checkBoxData = await fetchSingleData({ colRef: 'DataSource', docId: 'CheckBox' })
            setSelectedKeys(checkBoxData.checkBox)
        }
        fetchCheckBoxData()
    }, [])

    const onSubmitCheckBox = (onSeccuss: () => void) => {
        const values = {
            data: { checkBox: selectedKeys },
            colRef: 'DataSource',
            docId: 'CheckBox',
        }
        updateData.mutateAsync(values).then(() => {
            onSeccuss()
        })
    }

    return { selectedKeys, setSelectedKeys, isChecked, onSubmitCheckBox }
}
