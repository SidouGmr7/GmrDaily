import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    DocumentData,
    serverTimestamp,
    // where,
    setDoc,
    orderBy,
} from 'firebase/firestore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { db, DefaultCollection, DefaultSubCollection } from '../configs'
import { convertTimestampToDate } from '../utils'
import { FetchAllDataProps, UseFirebaseProps } from '../types'
import { TreeNode } from '../../../Resources/components/treeList/types'

export function useFirebase({ colRef = DefaultCollection, docId, condition }: UseFirebaseProps) {
    const queryClient = useQueryClient()

    const refertch = {
        onSettled: async () => {
            await queryClient.invalidateQueries([colRef])
        },
    }

    const { data, isFetching, refetch } = useQuery(
        [colRef, docId],
        async () => {
            return fetchCollectionData({ colRef, condition })
        },
        {
            staleTime: 300000, // Data is considered fresh for 5 minutes
            cacheTime: 3600000, // Data is cached for 1 hour
        }
    )
    const addData = useMutation(
        async ({ data, colRef = DefaultCollection, customDocId }: DocumentData) => {
            console.info('addData: ', data)
            const newData = { ...data, createdAt: serverTimestamp() }
            if (!customDocId) {
                // If you want to auto-generate the document ID
                const docRef = collection(db, colRef)
                await addDoc(docRef, newData)
            } else {
                // If you want to specify a custom document ID
                const docRef = doc(db, colRef, String(customDocId))
                await setDoc(docRef, newData)
            }
        },
        refertch
    )

    const updateData = useMutation(
        async ({ data, colRef = DefaultCollection, docId }: DocumentData) => {
            console.info('updateData: ', data)
            const newData = { ...data, createdAt: serverTimestamp() }
            await updateDoc(doc(db, colRef, docId), newData)
        },
        refertch
    )

    const deleteData = useMutation(async ({ colRef }: DocumentData) => {
        console.info('deleteData: ', colRef)
        await deleteDoc(doc(db, colRef))
    }, refertch)

    return {
        data,
        isFetching,
        refetch,
        addData,
        updateData,
        deleteData,
    }
}

export const fetchCollectionData = async ({
    colRef = DefaultCollection,
    level = 1,
    condition,
}: FetchAllDataProps) => {
    const { useSubCollection /*useFilterByProps*/ } = condition
    const collectionRef = collection(db, colRef)

    let queryBuilder = query(collectionRef, orderBy('createdAt', 'asc'));
    // if (useFilterByProps) {
    //     queryBuilder = query(queryBuilder, where('typeName', '==', typeName))
    // }
    const docSnap = await getDocs(queryBuilder)
    const dataPromises = docSnap.docs.map(async (doc: any) => {
        const data = doc.data()

        let subData = null
        if (useSubCollection) {
            subData = await fetchCollectionData({
                colRef: colRef + `/${doc.id}/${DefaultSubCollection}`,
                level: level + 1,
                condition: level < 2 ? condition : { useSubCollection: false },
            })
        }
        return {
            id: doc.id,
            ...data,
            ...(data?.createdAt && {
                createdAt: convertTimestampToDate(data?.createdAt),
            }),
            ...(subData &&
                useSubCollection && {
                    children: subData,
                }),
        } as TreeNode
    }) as TreeNode[]

    const data = await Promise.all(dataPromises)
    console.info('fetchData', colRef, ':', data)
    return data
}

export const fetchSingleData = async ({ colRef, docId }: any) => {
    const docSnap = await getDoc(doc(db, colRef, docId))
    const data = docSnap?.data()
    console.info('fetch single data', colRef, ': ', data)
    return {
        id: docSnap.id,
        ...data,
        ...(data?.createdAt && { createdAt: convertTimestampToDate(data?.createdAt) }),
    }
}
