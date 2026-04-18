import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUserBook } from '@/api/libraryService'
import { shelvesKey } from './shelvesKey'

export const useCreateUserBook = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createUserBook,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: shelvesKey.lists(),
            })
        },
    })
}
