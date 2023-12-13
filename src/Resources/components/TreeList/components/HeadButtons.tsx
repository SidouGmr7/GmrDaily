import { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import _ from 'lodash'

import { CHECKBOX_DOC_ID } from '@/configs'
import { useDataQuery } from '@/Resources/fetchData/useDataQuery'
import { useNodesDataModel } from '../state/use-nodes-data-modal'
import { useCheckboxDataModel } from '../state/use-checkbox-data-modal'

export const HeadButtons = () => {
    const { setNodesData } = useNodesDataModel()
    const {
        create: createNode,
        isAddLoading,
        isFetching,
    } = useDataQuery({ endpoint: 'node', onSuccess: (data) => setNodesData(data) })

    const {
        get: getChckBoxs,
        update: updateCheckBoxs,
        isUpadateLoading,
    } = useDataQuery({
        endpoint: 'checkbox',
        enabled: false,
    })
    const { selectedKeys, setSelectedKeys } = useCheckboxDataModel()
    const { setLastNodeCreated } = useNodesDataModel()
    const { setLastNodeDeleted, LastNodeDeletedStored } = useNodesDataModel()

    const [openTextField, setOpenTextField] = useState(false)
    const [newLableNode, setNewNodeLabel] = useState('')

    useEffect(() => {
        getChckBoxs({
            id: CHECKBOX_DOC_ID,
            onSuccess: (data: any) => setSelectedKeys(data.checkboxs),
        })
    }, [])

    const onSubmitNode = () => {
        createNode({
            data: { label: newLableNode },
            toastMessage: 'add New head Child',
            toastData: newLableNode,
            onSuccess: (data: any) => {
                setLastNodeCreated(data)
                setOpenTextField(false)
                setNewNodeLabel('')
            },
        })
    }

    const onSubmitCheckBox = () => {
        updateCheckBoxs({
            data: selectedKeys as object,
            id: CHECKBOX_DOC_ID,
            toastMessage: 'updated the checkbox',
        })
    }

    const onRestoreDataNode = () => {
        if (LastNodeDeletedStored) {
            createNode({
                data: {
                    label: LastNodeDeletedStored.label,
                    _ref: LastNodeDeletedStored._ref,
                    key: LastNodeDeletedStored.key,
                },
                toastMessage: 'add New head Child',
                toastData: newLableNode,
                onSuccess: () => {
                    setLastNodeDeleted('')
                },
            })
        }
    }

    return (
        <div className='mt-2 flex justify-center mb-4 space-x-2'>
            {openTextField && (
                <InputText
                    value={newLableNode}
                    onChange={(e) => setNewNodeLabel(e.target.value)}
                    autoFocus
                />
            )}
            <Button
                icon={
                    (!openTextField && !newLableNode) || newLableNode ? 'pi pi-plus' : 'pi pi-minus'
                }
                severity={(!openTextField && !newLableNode) || newLableNode ? 'info' : 'danger'}
                rounded
                onClick={
                    !openTextField || !newLableNode
                        ? () => setOpenTextField((prev) => !prev)
                        : onSubmitNode
                }
                loading={!LastNodeDeletedStored && isAddLoading}
            />
            <Button
                icon='pi pi-cloud-download'
                severity='info'
                rounded
                loading={isUpadateLoading}
                onClick={onSubmitCheckBox}
            />
            <Button
                loading={isFetching}
                icon={!isFetching ? 'pi pi-verified' : 'pi pi-times-circle'}
                severity={!isFetching ? 'info' : 'danger'}
                rounded
            />
            {!!LastNodeDeletedStored && (
                <Button
                    icon='pi pi-undo'
                    severity='warning'
                    rounded
                    loading={LastNodeDeletedStored && isAddLoading}
                    onClick={onRestoreDataNode}
                />
            )}
        </div>
    )
}
