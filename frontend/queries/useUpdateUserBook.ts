import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserBook } from '@/api/libraryService'
import { shelvesKey } from './shelvesKey'
import { BookStatus } from '@/types/library'

export const useUpdateUserBook = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            bookId,
            status,
            rating,
            readAt
        }: {
            bookId: string,
            status?: BookStatus,
            rating?: number,
            readAt?: string,
        }) => updateUserBook({ bookId, status, rating, readAt }),
        onSuccess: (_) => {
            queryClient.invalidateQueries({
                queryKey: shelvesKey.lists(),
            })
        },
    })
}
