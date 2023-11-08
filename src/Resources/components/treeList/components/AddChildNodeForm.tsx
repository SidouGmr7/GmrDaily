import { useContext, useState } from 'react'
import { Field, FormikProvider, useFormik } from 'formik'
import { Grid } from '@mui/material'
import { InputText } from 'primereact/inputtext'
import { TreeNode } from 'primereact/treenode'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputSwitch } from 'primereact/inputswitch'

import _ from 'lodash'

import { useTreeNode } from '../hooks/useTreeNode'
import { ToastContext } from '../../../../providers/ToastProvider'
import { useFirebase } from '../../../firebase/hooks/useFirebase'

type AddChildNodeFormProps = {
    parent: TreeNode
    node: TreeNode
    openDialog: boolean
    setOpenDialog: (bol: boolean) => void
}

export default function AddChildNodeForm({
    parent,
    node,
    openDialog,
    setOpenDialog,
}: AddChildNodeFormProps) {
    const { onSubmit } = useTreeNode({ parent, node })
    const { isFetching } = useFirebase({
        condition: { useSubCollection: true },
    })
    const { showToast, setOnSelection } = useContext(ToastContext)
    const [opentUrlField, setOpentUrlField] = useState(false)

    const formik = useFormik({
        initialValues: {
            newLableNode: '',
            url: '',
        },
        validate: (data) => {
            let errors = {}
            if (!data.newLableNode) {
                errors = { newLableNode: 'Label is required.' }
            }
            return errors
        },
        onSubmit: (dataNode) => {
            onSubmit(dataNode, () => {
                showToast({
                    detail: `${dataNode.newLableNode} to ${node.label}`,
                    summary: 'add newChild',
                })
                setOpenDialog(false)
                setOnSelection(true)
            })
            formik.resetForm()
        },
    })

    return (
        <FormikProvider value={formik}>
            <Dialog
                header={
                    <Grid>
                        Set Url Task
                        <InputSwitch
                            checked={opentUrlField}
                            onChange={(e) => setOpentUrlField(!!e.value)}
                        />
                    </Grid>
                }
                visible={openDialog}
                onHide={() => {
                    setOpenDialog(false)
                    setOnSelection(true)
                }}
            >
                <Grid className='card flex justify-content-center'>
                    <form onSubmit={formik.handleSubmit} className='flex flex-column'>
                        <Grid container style={{ display: 'grid', gridGap: '8px' }}>
                            <Field
                                as={InputText}
                                name='newLableNode'
                                value={formik.values.newLableNode || ''}
                                className='p-inputtext-sm'
                                autoFocus
                            />
                            {opentUrlField && (
                                <Field
                                    as={InputText}
                                    name='url'
                                    value={formik.values.url || ''}
                                    className='p-inputtext-sm'
                                    autoFocus
                                />
                            )}
                        </Grid>
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
