import { Field, FormikProvider, useFormik } from 'formik'
import { InputText } from 'primereact/inputtext'
// import { classNames } from 'primereact/utils'
import { useTreeNode } from './hooks/useTreeNode'
import { TreeNode } from 'primereact/treenode'
import { useContext, useState } from 'react'
import { ToastContext } from '../../../providers/ToastProvider'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { useFirebase } from '../../../Resources/firebase/hooks/useFirebase'
import _ from 'lodash'
import { Grid } from '@mui/material'

type AddChildNodeFormProps = {
    parent: TreeNode
    node: TreeNode
    isFetching: boolean
}

export default function AddChildNodeForm({ parent, node }: AddChildNodeFormProps) {
    const { onSubmit, removeNode, nodeToRemoved } = useTreeNode({ parent, node })
    const { isFetching } = useFirebase({
        condition: { useSubCollection: true },
    })
    const { showToast, setOnSelection } = useContext(ToastContext)
    const [openDialog, setOpenDialog] = useState(false)

    const formik = useFormik({
        initialValues: {
            newLableNode: '',
        },
        validate: (data) => {
            let errors = {}
            if (!data.newLableNode) {
                errors = { newLableNode: 'Label is required.' }
            }
            return errors
        },
        onSubmit: (data) => {
            onSubmit(data.newLableNode, () => {
                showToast({
                    detail: `${data.newLableNode} to ${node.label}`,
                    summary: 'add newChild',
                })
                setOpenDialog(false)
                setOnSelection(true)
            })
            formik.resetForm()
        },
    })

    const handleOpen = (e: any) => {
        e.stopPropagation()
        setOpenDialog(true)
        setOnSelection(false)
    }

    const handleRemove = (e: any) => {
        removeNode(e, () => showToast({ summary: 'Data Deleted', detail: node.label }))
    }

    return (
        <FormikProvider value={formik}>
            <Grid>
                {node.children && (
                    <Button
                        icon='pi pi-plus'
                        onClick={handleOpen}
                        text
                        rounded
                        outlined
                        size='small'
                    />
                )}

                <Button
                    icon='pi pi-minus'
                    rounded
                    text
                    severity='danger'
                    onClick={handleRemove}
                    loading={isFetching && nodeToRemoved === node.id}
                    disabled={!_.isEmpty(node.children)}
                />
            </Grid>
            <Dialog
                header='Add new Task'
                visible={openDialog}
                onHide={() => {
                    setOpenDialog(false)
                    setOnSelection(true)
                }}
            >
                <Grid className='card flex justify-content-center'>
                    <form onSubmit={formik.handleSubmit} className='flex flex-column'>
                        <Field
                            as={InputText}
                            name='newLableNode'
                            value={formik.values.newLableNode || ''}
                            className='p-inputtext-sm'
                        />
                        <Button
                            icon='pi pi-plus'
                            rounded
                            text
                            severity='info'
                            type='submit'
                            loading={isFetching}
                            disabled={!formik.values.newLableNode}
                        />
                    </form>
                </Grid>
            </Dialog>
        </FormikProvider>
    )
}
