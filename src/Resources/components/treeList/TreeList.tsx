import { useState } from 'react'
import { Tree } from 'primereact/tree'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import _ from 'lodash'

import { Options } from './types'
import { nodeTemplate } from './NodeTemplate'
import { generateNode } from './hooks/useTreeNode'
import { useCheckBoxNode } from './hooks/useCheckBoxNode'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useToastModel } from '@/Resources/hooks/use-toast-modal'
import { useFirebase } from '@/Resources/firebase/hooks/useFirebase'
import { DefaultCollection } from '@/Resources/firebase/configs'

export default function TreeList() {
    const { data, addData } = useFirebase({ condition: { useSubCollection: true } })
    const { localStorageData } = useLocalStorage(DefaultCollection, data)
    const { selectedKeys, setSelectedKeys, onSubmitCheckBox, isProgressCheckBox } = useCheckBoxNode(
        {}
    )
    // const [nodes, setNodes] = useState<TreeNode[] | undefined>([])
    const [openTextField, setOpenTextField] = useState(false)
    const [newLableNode, setNewNodeLabel] = useState('')
    const [isFetchingAddHead, setIsFetchingAddHead] = useState(false)
    const { showToast, onSelection, handleError } = useToastModel()
    const nodes = _.sortBy(data || localStorageData, (node) => Number(node.key))

    const onSubmit = () => {
        setIsFetchingAddHead(true)
        const dataNode = { newLableNode }
        const newNode = generateNode({ dataNode, head: nodes })

        const values = {
            data: newNode,
            customDocId: newNode.key,
            colRef: DefaultCollection,
        }
        addData
            .mutateAsync(values)
            .then(() => {
                showToast({ detail: values.data.label, summary: 'add New head Child' })
                setOpenTextField(false)
                setNewNodeLabel('')
                setIsFetchingAddHead(false)
            })
            .catch((error) => {
                setIsFetchingAddHead(false)
                handleError(error)
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
                    loading={isFetchingAddHead}
                />
                <Button
                    icon='pi pi-cloud-download'
                    severity='info'
                    rounded
                    loading={isProgressCheckBox}
                    onClick={onSubmitCheckBox}
                />
                <Button
                    icon={data ? 'pi pi-verified' : 'pi pi-times-circle'}
                    severity={data ? 'info' : 'danger'}
                    rounded
                />
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
