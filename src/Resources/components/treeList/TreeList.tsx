import { useState, useEffect } from 'react'
import { Tree, TreeDragDropEvent } from 'primereact/tree'
// import { NodeService } from './data'
import { ChekBookNodes, Options, TreeNode } from './types'
import { nodeTemplate } from './NodeTemplate'
// import { classNames } from 'primereact/utils'
// import { Button } from 'primereact/button'
import { useFirebase } from '../../../Resources/firebase/hooks/useFirebase'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { generateNode } from './useTreeNode'
import { DefaultCollection } from '../../../Resources/firebase/configs'

export default function TreeList() {
    const { data, addData } = useFirebase({ condition: { useSubCollection: true } })
    // const [nodes, setNodes] = useState<TreeNode[] | undefined>([])
    const [openTextField, setOpenTextField] = useState(false)
    const [newNodeLabel, setNewNodeLabel] = useState('')
    // const [selectedKeys, setSelectedKeys] = useState<ChekBookNodes>(null)
    // const [expandedKeys, setExpandedKeys] = useState({});
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
                // setQueryFinished(false)
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
            {!openTextField && (
                <div className='flex justify-center mb-4'>
                    <Button icon='pi pi-plus' rounded onClick={() => setOpenTextField(true)} />
                </div>
            )}
            {openTextField && (
                <div className='flex justify-center mb-4 space-x-2'>
                    <InputText
                        value={newNodeLabel}
                        onChange={(e) => setNewNodeLabel(e.target.value)}
                    />
                    <Button
                        icon={newNodeLabel ? 'pi pi-plus' : 'pi pi-minus'}
                        severity={newNodeLabel ? 'info' : 'danger'}
                        rounded
                        onClick={onSubmit}
                    />
                </div>
            )}
            <div className='card flex flex-column align-items-center'>
                {/* <ControleAllTreeOpenNode setExpandedKeys={setExpandedKeys} /> */}
                <Tree
                    value={data}
                    // dragdropScope='demo' to work
                    // onDragDrop={(e: TreeDragDropEvent) => setNodes(e.value)} to work
                    className='w-full'
                    filter
                    filterMode='strict'
                    filterPlaceholder='Strict Filter'
                    nodeTemplate={(node, options) => nodeTemplate(node, options as Options)}
                    // togglerTemplate={togglerTemplate}
                    // selectionMode='checkbox'
                    // expandedKeys={expandedKeys}
                    // onToggle={(e) => setExpandedKeys(e.value)}
                />
            </div>
        </>
    )
}

// const togglerTemplate = (node, options) => {
//     if (!node) {
//         return;
//     }
//     const expanded = options.expanded;
//     console.log('expanded',expanded)
//     const iconClassName = classNames('p-tree-toggler-icon pi pi-fw', {
//         'pi-caret-right': !expanded,
//         'pi-caret-down': expanded
//     });

//     return (
//         <button type="button" className="p-tree-toggler p-link" tabIndex={-1} onClick={options.onClick}>
//             <span className={iconClassName} aria-hidden="true"></span>
//         </button>
//     );
// };

// const ControleAllTreeOpenNode = ({ setExpandedKeys }) => {
//     const expandAll = () => {
//         let _expandedKeys = {}

//         for (let node of nodes) {
//             expandNode(node, _expandedKeys)
//         }

//         setExpandedKeys(_expandedKeys)
//     }

//     const collapseAll = () => {
//         setExpandedKeys({})
//     }

//     const expandNode = (node, _expandedKeys) => {
//         if (node.children && node.children.length) {
//             _expandedKeys[node.key] = true

//             for (let child of node.children) {
//                 expandNode(child, _expandedKeys)
//             }
//         }
//     }
//     return (
//         <div className='flex flex-wrap gap-2 mb-4'>
//             <Button type='button' icon='pi pi-plus' label='Expand All' onClick={expandAll} />
//             <Button type='button' icon='pi pi-minus' label='Collapse All' onClick={collapseAll} />
//         </div>
//     )
// }
