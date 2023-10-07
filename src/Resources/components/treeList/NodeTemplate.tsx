import { Button } from 'primereact/button'
import { ProgressBar } from 'primereact/progressbar'
import { InputText } from 'primereact/inputtext'
import { useFirebase } from '../../../Resources/firebase/hooks/useFirebase'
import { useTreeNode } from './useTreeNode'
import { Options, TreeNode } from './types'
import { ProgressSpinner } from 'primereact/progressspinner'

export const nodeTemplate = (node: TreeNode, options: Options) => {
    const { isFetching } = useFirebase({
        condition: { useSubCollection: true },
    })

    const { parent } = options.props
    const { onSubmit, newNodeLabel, handleChange, removeNode, nodeToRemoved, toggleNode } =
        useTreeNode({ node, parent })

    return !node.action ? (
        <>
            {node.children ? (
                <>
                    <div>
                        <span className={options.className}>
                            <b>{node.label}</b>
                        </span>
                    </div>
                    <Button
                        icon={node.expanded ? 'pi pi-minus' : 'pi pi-plus'}
                        severity={node.expanded ? 'danger' : 'info'}
                        rounded
                        text
                        onClick={toggleNode}
                    />
                    <div className='w-20'>
                        <ProgressBar value={50}></ProgressBar>
                    </div>
                </>
            ) : (
                <>
                    <span className={options.className}>{node.label}</span>
                    {isFetching && nodeToRemoved === node.id ? (
                        <div className='card'>
                            <ProgressSpinner style={{ width: '30px', height: '30px' }} />
                        </div>
                    ) : (
                        <Button
                            icon='pi pi-minus'
                            rounded
                            text
                            severity='danger'
                            onClick={removeNode}
                        />
                    )}
                </>
            )}
        </>
    ) : (
        <div className='space-x-2'>
            <InputText value={newNodeLabel} onChange={handleChange} />
            {true ? ( // to change in isFetching
                <Button icon='pi pi-plus' rounded onClick={onSubmit} />
            ) : (
                <div className='card'>
                    <ProgressSpinner style={{ width: '30px', height: '30px' }} />
                </div>
            )}
        </div>
    )
}
