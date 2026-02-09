import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addBookToShelf } from '@/api/libraryService'
import { shelvesKey } from './shelvesKey'

export const useAddBookToShelf = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            shelfId,
            bookId
        }: {
            shelfId: string
            bookId: string,
        }) => addBookToShelf({ shelfId, bookId }),
        onSuccess: (_, { shelfId }) => {
            queryClient.invalidateQueries({
                queryKey: shelvesKey.detail(shelfId),
            })
            queryClient.invalidateQueries({
                queryKey: shelvesKey.lists(),
            })
        },
        onError: (err) => {
            console.error('Failed to add book to shelf', err)
        }
    })
}

