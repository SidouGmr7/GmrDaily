import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNodesDataModel } from './use-nodes-data-modal'
import { useToastModel } from '@/Resources/hooks/use-toast-modal'

export function useNodesQuery() {
    const queryClient = useQueryClient()
    const { fetchNodes, createNode, deleteNode } = useNodesDataModel()
    const { handleError, showToast } = useToastModel()

    const {
        data: nodes,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ['fetch-nodes-data'],
        queryFn: fetchNodes,
        onError: (err) => handleError(err),
        staleTime: 300000, // Data is considered fresh for 5 minutes
        cacheTime: 3600000, // Data is cached for 1 hour
    })

    const addData = useMutation(createNode, {
        onSettled: async () => {
            await queryClient.invalidateQueries()
        },
        onError: (err) => {
            handleError(err)
        },
        onSuccess: (data, variables) => {
            variables.onSuccess()
        },
    })

    const deleteData = useMutation(deleteNode, {
        onSettled: async () => {
            await queryClient.invalidateQueries()
        },
        onError: (err) => {
            handleError(err)
        },
        onSuccess: (data, variables) => {
            variables.onSuccess()
        },
    })

    return {
        nodes,
        isFetching,
        isFetchingCreateNode: addData.isLoading,
        createNode: addData.mutateAsync,
        deleteNode: deleteData.mutateAsync,
        refetch,
    }
}
