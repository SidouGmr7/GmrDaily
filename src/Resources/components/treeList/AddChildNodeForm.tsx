import { Field, FormikProvider, useFormik } from 'formik'
import { InputText } from 'primereact/inputtext'
// import { classNames } from 'primereact/utils'
import { useTreeNode } from './hooks/useTreeNode'
import { TreeNode } from 'primereact/treenode'
import { useContext } from 'react'
import { ToastContext } from '../../../providers/ToastProvider'

type AddChildNodeFormProps = {
    parent: TreeNode
    node: TreeNode
    isFetching: boolean
}

export default function AddChildNodeForm({ parent, node }: AddChildNodeFormProps) {
    const { onSubmit } = useTreeNode({ parent, node })
    const { showToast } = useContext(ToastContext)

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
            onSubmit(data.newLableNode, () =>
                showToast({ detail: data.newLableNode, summary: 'add newChild' })
            )
            formik.resetForm()
        },
    })

    // const isFormFieldInvalid = (name: string) => !!(formik.touched[name] && formik.errors[name])

    // const getFormErrorMessage = (name: string) => {
    //     return isFormFieldInvalid(name) ? formik.errors[name] : ''
    // }

    return (
        <FormikProvider value={formik}>
            <div className='card flex justify-content-center'>
                <form onSubmit={formik.handleSubmit} className='flex flex-column'>
                    <Field
                        as={InputText}
                        name='newLableNode'
                        value={formik.values.newLableNode || ''}
                        // placeholder={getFormErrorMessage('newLableNode')}
                        // className={classNames(
                        //     { 'p-invalid': isFormFieldInvalid('newLableNode') },
                        //     'p-inputtext-sm'
                        // )}
                        // InputProps={{ style: { width: isMobile ? '96vw' : '60vw' } }}
                        className='p-inputtext-sm w-10'
                    />
                </form>
            </div>
        </FormikProvider>
    )
}
