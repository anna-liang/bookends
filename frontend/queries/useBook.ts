import { useQuery } from '@tanstack/react-query'
import { getBookById } from '@/api/booksService'

export const useBook = ({ id }: { id: string }) => {
    return useQuery({
        queryKey: ['book', id],
        queryFn: () => getBookById({ id: id! }),
        enabled: !!id,
        staleTime: 5 * 60000,
    })
}
