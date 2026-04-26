
"use client"

import { useDeleteBookFromShelf } from "@/queries/useDeleteBookFromShelf"
import { ButtonUtility } from "@/components/base/buttons/button-utility"
import { Trash01 } from "@untitledui/icons"

export default function DeleteButton({ shelfId, userBookId }: { shelfId: string, userBookId: string }) {
    const deleteBook = useDeleteBookFromShelf()

    const handleDeleteBook = () => {
        try {
            deleteBook.mutate({ shelfId, userBookId })
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

    return (
        <div>
            <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} onClick={handleDeleteBook} />
        </div>
    )
}