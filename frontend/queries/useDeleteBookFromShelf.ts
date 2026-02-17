import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBookFromShelf } from '@/api/libraryService'
import { shelvesKey } from './shelvesKey'

export const useDeleteBookFromShelf = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            shelfId,
            userBookId
        }: {
            shelfId: string
            userBookId: string,
        }) => deleteBookFromShelf({ shelfId, userBookId }),
        onSuccess: (_, { shelfId }) => {
            queryClient.invalidateQueries({
                queryKey: shelvesKey.detail(shelfId),
            })
            queryClient.invalidateQueries({
                queryKey: shelvesKey.lists(),
            })
        },
        onError: (err) => {
            console.error('Failed to delete book from shelf', err)
        }
    })
}

