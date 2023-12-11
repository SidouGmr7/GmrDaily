import { useState } from 'react'
import { Field, FormikProvider, useFormik } from 'formik'
import { Grid } from '@mui/material'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputSwitch } from 'primereact/inputswitch'
import _ from 'lodash'

import { useSelectionModel } from '../state/use-selection-model'
import { TreeNode } from '../types'
import { useNodesQuery } from '../hooks/useNodesQuery'

type AddChildNodeFormProps = {
    parent: TreeNode
    node: TreeNode
    openDialog: boolean
    setOpenDialog: (bol: boolean) => void
}

export default function AddChildNodeForm({
    node,
    openDialog,
    setOpenDialog,
}: AddChildNodeFormProps) {
    const { setOnSelection } = useSelectionModel()
    const { create: createNode, isAddLoading: isLoadingCreateNode } = useNodesQuery({ endpoint: 'node' })
    const [opentUrlField, setOpentUrlField] = useState(false)
    const formik = useFormik({
        initialValues: {
            label: '',
            url: '',
        },
        validate: (data) => {
            let errors = {}
            if (!data.label) {
                errors = { label: 'Label is required.' }
            }
            return errors
        },
        onSubmit: (dataNode) => {
            createNode({
                data: { ...dataNode, _ref: node._id, parentKey: node.key },
                toastMessage: 'add newChild',
                toastData: `${dataNode.label} to ${node.label}`,
                onSuccess: () => {
                    setOpenDialog(false)
                    setOnSelection(true)
                },
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
                    setOpentUrlField(false)
                }}
            >
                <Grid className='card flex justify-content-center'>
                    <form onSubmit={formik.handleSubmit} className='flex flex-column'>
                        <Grid container style={{ display: 'grid', gridGap: '8px' }}>
                            <Field
                                as={InputText}
                                name='label'
                                value={formik.values.label || ''}
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
                            loading={isLoadingCreateNode}
                            disabled={!formik.values.label}
                        />
                    </form>
                </Grid>
            </Dialog>
        </FormikProvider>
    )
}
