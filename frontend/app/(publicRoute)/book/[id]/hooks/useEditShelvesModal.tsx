import { useAddBookToShelf } from "@/queries/useAddBookToShelf"
import { useDeleteBookFromShelf } from "@/queries/useDeleteBookFromShelf"
import { useShelves } from "@/queries/useShelves"
import { useState, useEffect } from "react"

export const useEditShelvesModal = ({ bookId, userBookId }: { bookId: string, userBookId: string }) => {
    const addBookToShelf = useAddBookToShelf()
    const deleteBookFromShelf = useDeleteBookFromShelf()
    const getShelves = useShelves()
    const shelves = getShelves.data
    // Get all shelves `bookId` is in
    const getShelvesWithBook = useShelves({ bookId })
    const shelvesWithBook = getShelvesWithBook.data
    const shelvesWithBookIds = shelvesWithBook?.map((shelf) => shelf.id) || []

    const [selectedShelves, setSelectedShelves] = useState<string[]>([])

    useEffect(() => {
        if (getShelvesWithBook.data) {
            setSelectedShelves(getShelvesWithBook.data.map((shelf) => shelf.id))
        }
    }, [getShelvesWithBook.data])

    const handleClickCheckbox = (shelfId: string) => {
        // If shelfId is already selected, unselect it (remove)
        if (selectedShelves.includes(shelfId)) {
            setSelectedShelves(selectedShelves.filter((id) => id !== shelfId))
        }
        // Otherwise, add to selected shelves
        else {
            setSelectedShelves([...selectedShelves, shelfId])
        }
    }

    const handleSave = async () => {
        try {
            // Find the difference between selectedShelves and shelvesWithBook
            // Add shelves in selectedShelves that are not in shelvesWithBook
            const shelvesToAdd = selectedShelves.filter((shelfId) => !shelvesWithBookIds?.includes(shelfId))
            shelvesToAdd.forEach((shelfId) => {
                addBookToShelf.mutate({ shelfId, bookId })
            })
            // Delete shelves in shelvesWithBook that are not in selectedShelves
            const shelvesToDelete = shelvesWithBookIds?.filter((shelfId) => !selectedShelves.includes(shelfId))
            shelvesToDelete.forEach((shelfId) => { deleteBookFromShelf.mutate({ shelfId, userBookId }) })
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message)
                // setError(err.message);
            } else {
                console.error(err)
                // setError(`Unknown Error: ${err}`)
            }
        }
    }

    return { shelves, selectedShelves, handleClickCheckbox, handleSave }
}