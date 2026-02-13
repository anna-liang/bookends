import { useQuery } from '@tanstack/react-query'
import { getRecommendationsForBook } from '@/api/recommendationsService'

export const useRecommendationsBook = ({ bookId }: { bookId?: string }) => {
    return useQuery({
        queryKey: bookId ? ['recommendations', 'book', bookId] : ['recommendations', 'book', 'empty'],
        queryFn: () => getRecommendationsForBook({ bookId: bookId! }),
        enabled: !!bookId,
        staleTime: 5 * 60000
    })
}
