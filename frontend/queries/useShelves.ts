import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getShelves } from '@/api/libraryService'
import { shelvesKey } from './shelvesKey'
import { Shelf } from '@/types/library'

export const useShelves = (): UseQueryResult<Shelf[], Error> => {
    return useQuery({
        queryKey: shelvesKey.lists(),
        queryFn: getShelves,
        staleTime: 5 * 60000,
        retry: false
    })
}
