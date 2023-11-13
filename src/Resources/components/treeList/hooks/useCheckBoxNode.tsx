import { useEffect, useState } from 'react'
import _ from 'lodash'

import { useToastModel } from '@/Resources/hooks/use-toast-modal'
import { fetchSingleData, useFirebase } from '@/Resources/firebase/hooks/useFirebase'
import { CheckBoxNodes, TreeNode } from '../types'

type UseCheckBoxNodeProps = {
    node?: TreeNode
    selectionKeys?: any
}

export const useCheckBoxNode = ({ node, selectionKeys }: UseCheckBoxNodeProps) => {
    const { updateData } = useFirebase({ condition: { useSubCollection: true } })
    const [selectedKeys, setSelectedKeys] = useState<CheckBoxNodes>(null)
    const [isProgress, setIsProgress] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState(false)
    const { handleError, showToast } = useToastModel()

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
        _.isEmpty(selectionKeys) && fetchCheckBoxData()
    }, [])

    const onSubmitCheckBox = () => {
        setIsProgress(true)
        const values = {
            data: { checkBox: selectedKeys },
            colRef: 'DataSource',
            docId: 'CheckBox',
        }
        updateData
            .mutateAsync(values)
            .then(() => {
                showToast({ summary: 'update CheckBox' })
                setIsProgress(false)
            })
            .catch((error) => {
                setIsProgress(false)
                handleError(error)
            })
    }

    return {
        selectedKeys,
        setSelectedKeys,
        isChecked,
        onSubmitCheckBox,
        isProgressCheckBox: isProgress,
    }
}
