import { useEffect, useState } from 'react'
import { Tree } from 'primereact/tree'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import _ from 'lodash'

import { Options } from './types'
import { nodeTemplate } from './NodeTemplate'
// import { useLocalStorage } from './hooks/useLocalStorage'
import { useSelectionModel } from './state/use-selection-model'
import { useNodesQuery } from './hooks/useNodesQuery'
import { useNodesDataModel } from './state/use-nodes-data-modal'
import { useCheckboxDataModel } from './state/use-checkbox-data-modal'
import { CHECKBOX_DOC_ID } from '@/configs'

export default function TreeList() {
    const {
        data: nodes,
        create: createNode,
        isAddLoading: isLoadingCreateNode,
    } = useNodesQuery({ endpoint: 'node' })
    const {
        get: getChckBoxs,
        update: updateCheckBox,
        isUpadateLoading: isLoadingUpdateCheckbox,
    } = useNodesQuery({
        endpoint: 'checkbox',
    })
    const { setLastNodeCreated } = useNodesDataModel()
    const { onSelection } = useSelectionModel()
    const { selectedKeys, setSelectedKeys } = useCheckboxDataModel()

    // const { localStorageData } = useLocalStorage(DefaultCollection, data)
    const [openTextField, setOpenTextField] = useState(false)
    const [newLableNode, setNewNodeLabel] = useState('')

    const onSubmit = () => {
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

    useEffect(() => {
        getChckBoxs({ id: CHECKBOX_DOC_ID, onSuccess: (data) => setSelectedKeys(data.checkboxs) })
    }, [])

    const onSubmitCheckBox = () => {
        updateCheckBox({
            data: selectedKeys as object,
            id: CHECKBOX_DOC_ID,
            toastMessage: 'updated the checkbox',
        })
    }

    return (
        <div>
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
                        (!openTextField && !newLableNode) || newLableNode
                            ? 'pi pi-plus'
                            : 'pi pi-minus'
                    }
                    severity={(!openTextField && !newLableNode) || newLableNode ? 'info' : 'danger'}
                    rounded
                    onClick={
                        !openTextField || !newLableNode
                            ? () => setOpenTextField((prev) => !prev)
                            : onSubmit
                    }
                    loading={isLoadingCreateNode}
                />
                <Button
                    icon='pi pi-cloud-download'
                    severity='info'
                    rounded
                    loading={isLoadingUpdateCheckbox}
                    onClick={onSubmitCheckBox}
                />
                {/* <Button
                    icon={data ? 'pi pi-verified' : 'pi pi-times-circle'}
                    severity={data ? 'info' : 'danger'}
                    rounded
                /> */}
            </div>
            <div>
                <Tree
                    value={nodes}
                    className='w-full'
                    filter
                    filterMode='strict'
                    filterPlaceholder='Strict Filter'
                    nodeTemplate={(node, options) => nodeTemplate(node, options as Options)}
                    selectionMode='checkbox'
                    selectionKeys={selectedKeys}
                    onSelectionChange={(e) => {
                        onSelection && setSelectedKeys(e.value)
                    }}
                />
            </div>
        </div>
    )
}
