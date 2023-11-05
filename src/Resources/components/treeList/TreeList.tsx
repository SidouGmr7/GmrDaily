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
    const { selectedKeys, setSelectedKeys, onSubmitCheckBox } = useCheckBoxNode({})
    // const [nodes, setNodes] = useState<TreeNode[] | undefined>([])
    const [openTextField, setOpenTextField] = useState(false)
    const [newNodeLabel, setNewNodeLabel] = useState('')
    const { showToast, onSelection } = useContext(ToastContext)

    const onSubmit = () => {
        const newNode = generateNode({ newNodeLabel, head: data })

        const values = {
            data: newNode,
            customDocId: newNode.key,
            colRef: DefaultCollection,
        }
        if (newNodeLabel) {
            addData.mutateAsync(values).then(() => {
                showToast({ detail: values.data.label, summary: 'add New head Child' })
                setOpenTextField(false)
                setNewNodeLabel('')
            })
        } else {
            setOpenTextField(false)
        }
    }

    return (
        <div>
            <div className='mt-2 flex justify-center mb-4 space-x-2'>
                {openTextField && (
                    <InputText
                        value={newNodeLabel}
                        onChange={(e) => setNewNodeLabel(e.target.value)}
                    />
                )}
                <Button
                    label='NewNode'
                    severity={(!openTextField && !newNodeLabel) || newNodeLabel ? 'info' : 'danger'}
                    rounded
                    onClick={!openTextField ? () => setOpenTextField(true) : onSubmit}
                />

                <Button
                    label='CheckBox'
                    severity='info'
                    rounded
                    onClick={() =>
                        onSubmitCheckBox(() => showToast({ summary: 'update CheckBox' }))
                    }
                />
                <Button
                    label={data ? 'Firebase' : 'LocalStorage'}
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
