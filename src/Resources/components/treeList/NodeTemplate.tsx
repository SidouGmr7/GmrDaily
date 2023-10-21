import { Button } from 'primereact/button'
import { ProgressBar } from 'primereact/progressbar'
import { useFirebase } from '../../../Resources/firebase/hooks/useFirebase'
import { useTreeNode } from './hooks/useTreeNode'
import { useCheckBoxNode } from './hooks/useCheckBoxNode'
import { useProgressNode } from './hooks/useProgressNode'
import { Options, TreeNode } from './types'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Grid } from '@mui/material'
import AddChildNodeForm from './AddChildNodeForm'
import { ToastContext } from '../../../providers/ToastProvider'
import { useContext } from 'react'

export const nodeTemplate = (node: TreeNode, options: Options) => {
    const { isFetching } = useFirebase({
        condition: { useSubCollection: true },
    })
    const { parent, selectionKeys } = options.props
    const { removeNode, nodeToRemoved, toggleNode } = useTreeNode({ node, parent })
    const { isChecked } = useCheckBoxNode({ node, selectionKeys })
    const { progress } = useProgressNode({ node, selectionKeys })
    const { showToast } = useContext(ToastContext)

    return (
        <>
            <div className='md:w-[100%] w-[80%]'>
                <span className={options.className}>
                    {isChecked ? <del>{node.label}</del> : node.label}
                </span>
            </div>
            {!node.action ? (
                <>
                    {node.children ? (
                        <Grid container className='justify-end flex items-center'>
                            <Button
                                icon={node.expanded ? 'pi pi-minus' : 'pi pi-plus'}
                                severity={node.expanded ? 'danger' : 'info'}
                                rounded
                                text
                                onClick={toggleNode}
                            />
                            <ProgressBar value={progress}></ProgressBar>
                        </Grid>
                    ) : (
                        <>
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
                                    onClick={(e) =>
                                        removeNode(e, () =>
                                            showToast({
                                                detail: node.label,
                                                summary: 'remove data',
                                            })
                                        )
                                    }
                                />
                            )}
                        </>
                    )}
                </>
            ) : (
                <AddChildNodeForm parent={parent} node={node} isFetching={isFetching} />
            )}
        </>
    )
}
