import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToastModel } from '@/Resources/hooks/use-toast-modal'
import { axiosData } from '@/Resources/fetchData/axios'

type useNodesQueryProps = {
    endpoint: string
}

type actionData = (props: actionDataProps) => void

type actionDataProps = {
    data?: object
    id?: string | number
    toastMessage?: string
    toastData?: string | number | boolean
    onSuccess?: (data: any) => void
}

export function useNodesQuery({ endpoint }: useNodesQueryProps) {
    const queryClient = useQueryClient()
    const { handleError, showToast } = useToastModel()

    const params = {
        onSettled: async () => {
            await queryClient.invalidateQueries()
        },
        onError: (err: any) => {
            handleError(err)
        },
        onSuccess: (data: any, variables: any) => {
            variables.onSuccess && variables.onSuccess(data?.result)
            showToast({
                summary: variables?.toastMessage || 'successfuly',
                detail: variables?.toastData,
            })
        },
    }

    const { data, isFetching, refetch } = useQuery({
        queryKey: ['fetch-nodes-data'],
        queryFn: () => axiosData({ endpoint, method: 'GET' }),
        onError: (err) => handleError(err),
        staleTime: 300000, // Data is considered fresh for 5 minutes
        cacheTime: 3600000, // Data is cached for 1 hour
    })

    const getData = useMutation(
        ({ id }) =>
            axiosData({
                endpoint,
                method: 'GET_ID',
                id,
            }),
        params
    )

    const addData = useMutation(
        ({ data }) =>
            axiosData({
                endpoint,
                method: 'POST',
                data,
            }),
        params
    )
    const deleteData = useMutation(
        ({ id }) =>
            axiosData({
                endpoint,
                method: 'DELETE',
                id,
            }),
        params
    )
    const updateData = useMutation(
        ({ id, data }) =>
            axiosData({
                endpoint,
                method: 'PATCH',
                id,
                data,
            }),
        params
    )
    return {
        data,
        isFetching,
        isAddLoading: addData.isLoading,
        isDeleteLoading: deleteData.isLoading,
        isUpadateLoading: updateData.isLoading,
        create: addData.mutateAsync as actionData,
        delete: deleteData.mutateAsync as actionData,
        update: updateData.mutateAsync as actionData,
        get: getData.mutateAsync as actionData,
        refetch,
    }
}
