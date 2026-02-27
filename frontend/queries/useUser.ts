import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/api/authService'

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        staleTime: 5 * 60000,
    })
}
