import { useQuery } from '@tanstack/react-query'
import { getUserBook } from '@/api/libraryService'
import { User } from '@/types/user'

export const useUserBook = ({ bookId, user }: { bookId: string, user?: User }) => {
    return useQuery({
        queryKey: ['user', user ? user.id : '', 'book', bookId],
        queryFn: () => getUserBook({ bookId }),
        enabled: !!user,
        staleTime: 5 * 60000,
    })
}
