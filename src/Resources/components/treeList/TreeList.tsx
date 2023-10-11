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

export default function TreeList() {
    const { data, addData } = useFirebase({ condition: { useSubCollection: true } })
    // console.log('data: ', data);
    const { selectedKeys, setSelectedKeys, onSubmitCheckBox } = useCheckBoxNode({})
    // const [nodes, setNodes] = useState<TreeNode[] | undefined>([])
    const [openTextField, setOpenTextField] = useState(false)
    const [newNodeLabel, setNewNodeLabel] = useState('')
    // useEffect(() => {
    //     setNodes(data)
    // }, [nodes])
    const onSubmit = () => {
        const newNode = generateNode({ newNodeLabel, head: data })

        const values = {
            data: newNode,
            customDocId: newNode.key,
            colRef: DefaultCollection,
        }
        if (newNodeLabel) {
            addData.mutateAsync(values).then(() => {
                console.log('seccussfuly')
                setOpenTextField(false)
                setNewNodeLabel('')
            })
        } else {
            setOpenTextField(false)
        }
    }

    return (
        <>
            <div className='flex justify-center mb-4 space-x-2'>
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

                <Button label='CheckBox' severity='info' rounded onClick={onSubmitCheckBox} />
            </div>
            <div className='card flex flex-column align-items-center'>
                <Tree
                    value={data}
                    className='w-full'
                    filter
                    filterMode='strict'
                    filterPlaceholder='Strict Filter'
                    nodeTemplate={(node, options) => nodeTemplate(node, options as Options)}
                    selectionMode='checkbox'
                    selectionKeys={selectedKeys}
                    onSelectionChange={(e) => setSelectedKeys(e.value)}
                />
            </div>
        </>
    )
}
