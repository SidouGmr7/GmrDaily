import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToastModel } from '@/Resources/hooks/use-toast-modal'
import { axiosData } from '@/Resources/fetchData/axios'
import { METHODE, GET_METHODE, PATCH_METHODE, DELETE_METHODE, POST_METHODE } from './types'

type DataQueryProps = {
    endpoint: string
    enabled?: boolean
    onSuccess?: (data: any) => void
}

export function useDataQuery({ endpoint, enabled = true, onSuccess }: DataQueryProps) {
    const queryClient = useQueryClient()
    const { handleError, showToast } = useToastModel()

    const commonMutationConfig = {
        onSettled: async () => await queryClient.invalidateQueries(),
        onError: (err: any) => handleError(err?.response?.data?.err || err?.message),
        onSuccess: (data: any, variables: any) => {
            variables.onSuccess && variables.onSuccess(data)
            showToast({
                summary: variables?.toastMessage || 'successfuly',
                detail: variables?.toastData,
            })
        },
    }

    const queryConfig = {
        queryKey: [`fetch-${endpoint}-data`],
        queryFn: () => axiosData({ endpoint, method: 'GET' }),
        onError: (err: Error) => handleError(err),
        onSuccess: (data: object) => onSuccess && onSuccess(data),
        staleTime: 300000, // Data is considered fresh for 5 minutes
        cacheTime: 3600000, // Data is cached for 1 hour
        enabled: enabled,
    }

    const { data, isFetching, refetch } = useQuery(queryConfig)

    const createMutation = (method: METHODE) =>
        useMutation(
            ({ id, data }) =>
                axiosData({
                    endpoint,
                    method,
                    id,
                    data,
                }),
            commonMutationConfig
        )

    const createQuery = createMutation('POST')
    const updateQuery = createMutation('PATCH')
    const getQuery = createMutation('GET_ID')
    const deleteQuery = createMutation('DELETE')

    return {
        data,
        isFetching,
        isAddLoading: createQuery.isLoading,
        isDeleteLoading: deleteQuery.isLoading,
        isUpdateLoading: updateQuery.isLoading,
        isGetLoading: getQuery.isLoading,
        create: createQuery.mutateAsync as POST_METHODE,
        delete: deleteQuery.mutateAsync as DELETE_METHODE,
        update: updateQuery.mutateAsync as PATCH_METHODE,
        get: getQuery.mutateAsync as GET_METHODE,
        refetch,
    }
}
