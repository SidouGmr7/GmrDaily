export type METHODE = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'GET_ID'

type CommonProps = {
    toastMessage?: string
    toastData?: string | number | boolean
    onSuccess?: (data: any) => void
}

export type GET_METHODE = (props: { id: string | number } & CommonProps) => void
export type PATCH_METHODE = (props: { data: object; id: string | number } & CommonProps) => void
export type DELETE_METHODE = (props: { id: string | number } & CommonProps) => void
export type POST_METHODE = (props: { data: object } & CommonProps) => void
