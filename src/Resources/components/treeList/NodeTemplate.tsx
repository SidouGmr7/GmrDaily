import { ProgressBar } from 'primereact/progressbar'
import { useFirebase } from '../../../Resources/firebase/hooks/useFirebase'
import { useCheckBoxNode } from './hooks/useCheckBoxNode'
import { useProgressNode } from './hooks/useProgressNode'
import { Options, TreeNode } from './types'
import { Grid } from '@mui/material'
import AddChildNodeForm from './AddChildNodeForm'

export const nodeTemplate = (node: TreeNode, options: Options) => {
    const { isFetching } = useFirebase({
        condition: { useSubCollection: true },
    })
    const { parent, selectionKeys } = options.props
    const { isChecked } = useCheckBoxNode({ node, selectionKeys })
    const { progress } = useProgressNode({ node, selectionKeys })

    return (
        <>
            <Grid width={{ xs: '80%', sm: '100%' }}>
                <span className={options.className}>
                    {isChecked ? <del>{node.label}</del> : node.label}
                </span>
            </Grid>
            <Grid container className='justify-end flex items-center space-x-4'>
                <AddChildNodeForm parent={parent} node={node} isFetching={isFetching} />
                {node.children && <ProgressBar value={progress}></ProgressBar>}
            </Grid>
        </>
    )
}
