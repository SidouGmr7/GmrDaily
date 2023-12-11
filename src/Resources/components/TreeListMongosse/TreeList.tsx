import { useState } from 'react'
import { Tree } from 'primereact/tree'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import _ from 'lodash'

import { Options } from './types'
import { nodeTemplate } from './NodeTemplate'
// import { useCheckBoxNode } from './hooks/useCheckBoxNode'
// import { useLocalStorage } from './hooks/useLocalStorage'
import { useToastModel } from '@/Resources/hooks/use-toast-modal'
// import { DefaultCollection } from '@/Resources/firebase/configs'
import { useNodesQuery } from './hooks/useNodesQuery'

export default function TreeList() {
    const { nodes, createNode, isFetchingCreateNode } = useNodesQuery()
    const { showToast, onSelection } = useToastModel()

    // const { localStorageData } = useLocalStorage(DefaultCollection, data)
    // const { selectedKeys, setSelectedKeys, onSubmitCheckBox, isProgressCheckBox } = useCheckBoxNode(
    //     {}
    // )
    const [openTextField, setOpenTextField] = useState(false)
    const [newLableNode, setNewNodeLabel] = useState('')

    const onSubmit = () => {
        createNode({
            newNodeValues: { label: newLableNode },
            onSuccess: () => {
                showToast({ detail: newLableNode, summary: 'add New head Child' })
                setOpenTextField(false)
                setNewNodeLabel('')
            },
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
                    loading={isFetchingCreateNode}
                />
                {/* <Button
                    icon='pi pi-cloud-download'
                    severity='info'
                    rounded
                    loading={isProgressCheckBox}
                    onClick={onSubmitCheckBox}
                /> */}
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
                    // selectionKeys={selectedKeys}
                    // onSelectionChange={(e) => {
                    //     onSelection && setSelectedKeys(e.value)
                    // }}
                />
            </div>
        </div>
    )
}
