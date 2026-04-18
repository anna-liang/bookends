import { useQuery } from '@tanstack/react-query'
import { getUserBook } from '@/api/libraryService'
import { User } from '@/types/user'
import { userBookKeys } from './userBookKey'

export const useUserBook = ({ bookId, user }: { bookId: string, user?: User }) => {
    return useQuery({
        queryKey: userBookKeys.detail(user?.id ?? '', bookId),
        queryFn: () => getUserBook({ bookId }),
        enabled: !!user,
        staleTime: 5 * 60000,
    })
}
