import { Field, FormikProvider, useFormik } from 'formik'
import { InputText } from 'primereact/inputtext'
// import { classNames } from 'primereact/utils'
import { useTreeNode } from './hooks/useTreeNode'
import { TreeNode } from 'primereact/treenode'
import { useContext, useState } from 'react'
import { ToastContext } from '../../../providers/ToastProvider'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useFirebase } from '../../../Resources/firebase/hooks/useFirebase'
import _ from 'lodash'

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
        e.stopPropagation()
        if (_.isEmpty(node.children)) {
            removeNode(e, () => showToast({ summary: 'Data Deleted', detail: node.label }))
        } else {
            showToast({ severity: 'warn', summary: 'This node is not empty', detail: node.label })
        }
    }

    return (
        <FormikProvider value={formik}>
            {true && (
                <div>
                    <Button
                        icon='pi pi-plus'
                        onClick={handleOpen}
                        text
                        rounded
                        outlined
                        size='small'
                    />
                    {isFetching && nodeToRemoved === node.id ? (
                        <ProgressSpinner style={{ width: '30px', height: '30px' }} />
                    ) : (
                        <Button
                            icon='pi pi-minus'
                            rounded
                            text
                            severity='danger'
                            onClick={handleRemove}
                        />
                    )}
                </div>
            )}
            <Dialog
                header='Add new Task'
                visible={openDialog}
                onHide={() => {
                    setOpenDialog(false)
                    setOnSelection(true)
                }}
            >
                <div className='card flex justify-content-center'>
                    <form onSubmit={formik.handleSubmit} className='flex flex-column'>
                        <Field
                            as={InputText}
                            name='newLableNode'
                            value={formik.values.newLableNode || ''}
                            className='p-inputtext-sm'
                        />
                        {isFetching ? (
                            <ProgressSpinner style={{ width: '30px', height: '30px' }} />
                        ) : (
                            <Button icon='pi pi-plus' rounded text severity='info' type='submit' />
                        )}
                    </form>
                </div>
            </Dialog>
        </FormikProvider>
    )
}
