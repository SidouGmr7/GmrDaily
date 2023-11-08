import { useState } from 'react'
import { Tree } from 'primereact/tree'
import { Options } from './types'
import { nodeTemplate } from './NodeTemplate'
import { useFirebase } from '../../../Resources/firebase/hooks/useFirebase'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { generateNode } from './hooks/useTreeNode'
import { DefaultCollection } from '../../../Resources/firebase/configs'
import { useCheckBoxNode } from './hooks/useCheckBoxNode'
import { ToastContext } from '../../../providers/ToastProvider'
import { useContext } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function TreeList() {
    const { data, addData } = useFirebase({ condition: { useSubCollection: true } })
    const { localStorageData } = useLocalStorage('nodes', data)
    const { selectedKeys, setSelectedKeys, onSubmitCheckBox, isProgressCheckBox } = useCheckBoxNode(
        {}
    )
    // const [nodes, setNodes] = useState<TreeNode[] | undefined>([])
    const [openTextField, setOpenTextField] = useState(false)
    const [newNodeLabel, setNewNodeLabel] = useState('')
    const [isFetchingAddHead, setIsFetchingAddHead] = useState(false)
    const { showToast, onSelection, handleError } = useContext(ToastContext)

    const onSubmit = () => {
        setIsFetchingAddHead(true)
        const newNode = generateNode({ newNodeLabel, head: data })

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
                        value={newNodeLabel}
                        onChange={(e) => setNewNodeLabel(e.target.value)}
                        autoFocus
                    />
                )}
                <Button
                    icon={
                        (!openTextField && !newNodeLabel) || newNodeLabel
                            ? 'pi pi-plus'
                            : 'pi pi-minus'
                    }
                    severity={(!openTextField && !newNodeLabel) || newNodeLabel ? 'info' : 'danger'}
                    rounded
                    onClick={
                        !openTextField || !newNodeLabel
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
                    value={data || localStorageData}
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
