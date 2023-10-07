import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'

export type MyDocumentSnapshot = QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
export type MyDocumentSnapshots = QueryDocumentSnapshot<DocumentData, DocumentData>[]

export interface UseFirebaseProps {
    colRef?: string
    docId?: any
    condition?: any
    // filters?: string | undefined
}

export type FetchAllDataProps = Omit<UseFirebaseProps, 'docId'> & {
    colRef?: string
    level?: number
}
export type FetchDataProps = Pick<UseFirebaseProps, 'colRef' | 'docId'>

export type MiniTask = {
    id: string
    title: string
    createdAt: string
    // filters?: string | undefined
    map: any
}
