// @ts-nocheck
import { ProgressBar } from 'primereact/progressbar'
import { useProgressNode } from './hooks/useProgressNode'
import { Options, TreeNode } from './types'
import { Grid } from '@mui/material'
import { NodeOptions } from './components/NodeOptions'

export const nodeTemplate = (node: TreeNode, options: Options) => {
    const { parent, selectionKeys } = options.props
    const { progress } = useProgressNode({ node, selectionKeys })
        return (
        <>
            <Grid width={{ xs: '80%', sm: '100%' }}>
                <span className={options.className}>
                { selectionKeys && selectionKeys[node.key]?.checked ? <del>{node.label}</del> : node.label}
                </span>
            </Grid>
            <Grid container className='justify-end flex items-center space-x-4'>
                <NodeOptions parent={parent} node={node} />
                {node.children && !node?.url && <ProgressBar value={progress}></ProgressBar>}
            </Grid>
        </>
    )
}
