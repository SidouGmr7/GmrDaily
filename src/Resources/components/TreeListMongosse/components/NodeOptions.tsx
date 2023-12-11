import { useState } from 'react'
import { Button } from 'primereact/button'
import { Grid } from '@mui/material'
import _ from 'lodash'

import { useSelectionModel } from '../state/use-selection-model'
import { TreeNode } from '../types'
import AddChildNodeForm from './AddChildNodeForm'
import { useNodesQuery } from '../hooks/useNodesQuery'

type NodeOptionsProps = {
    parent: TreeNode
    node: TreeNode
}

export function NodeOptions({ parent, node }: NodeOptionsProps) {
    const { delete: deleteNode } = useNodesQuery({ endpoint: 'node' })
    const { setOnSelection } = useSelectionModel()
    const [openDialog, setOpenDialog] = useState(false)
    const [nodeToRemoved, setNodeToRemoved] = useState('')

    const handleOpen = (e: any) => {
        e.stopPropagation()
        setOpenDialog(true)
        setOnSelection(false)
    }

    const handleRemove = (e: any) => {
        e.stopPropagation()
        setNodeToRemoved(node._id || '')
        deleteNode({ id: node._id, toastMessage: 'data deleted', toastData: node.label })
    }

    const handleOpenLink = (e: any) => {
        e.stopPropagation()
        window.open(node?.url)
    }

    return (
        <Grid>
            {!node.url && (
                <Button icon='pi pi-plus' onClick={handleOpen} text rounded outlined size='small' />
            )}
            {node.url && (
                <Button
                    icon='pi pi-link'
                    onClick={handleOpenLink}
                    text
                    rounded
                    outlined
                    size='small'
                />
            )}
            <AddChildNodeForm
                parent={parent}
                node={node}
                setOpenDialog={setOpenDialog}
                openDialog={openDialog}
            />
            <Button
                icon='pi pi-minus'
                rounded
                text
                size='small'
                severity='danger'
                onClick={handleRemove}
                loading={nodeToRemoved === node.id}
                disabled={!_.isEmpty(node.children)}
            />
        </Grid>
    )
}
