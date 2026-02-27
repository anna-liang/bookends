import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserBook } from '@/api/libraryService'
import { shelvesKey } from './shelvesKey'
import { BookStatus } from '@/types/library'

export const useUpdateUserBook = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            userBookId,
            status,
            rating,
            readAt
        }: {
            userBookId: string,
            status?: BookStatus,
            rating?: number,
            readAt?: string,
        }) => updateUserBook({ userBookId, status, rating, readAt }),
        onSuccess: (_) => {
            queryClient.invalidateQueries({
                queryKey: shelvesKey.lists(),
            })
        },
    })
}
