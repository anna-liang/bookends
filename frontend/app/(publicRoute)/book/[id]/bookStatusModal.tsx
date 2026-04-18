"use client"

import { Button, Modal } from "@heroui/react";
import { useUpdateUserBook } from "@/queries/useUpdateUserBook";
import { useCreateUserBook } from "@/queries/useCreateUserBook";
import { BookStatus, BookStatusReadable } from "@/types/library";
import BookStatusButton from "./bookStatusButton";
import { useState } from "react";

export default function BookStatusModal({ bookId, bookStatus, userBookId }: { bookId: string, bookStatus?: BookStatus | undefined, userBookId?: string }) {
    const updateUserBook = useUpdateUserBook()
    const createUserBook = useCreateUserBook()
    const status = bookStatus ?? BookStatus.TO_READ
    const [selectedStatus, setSelectedStatus] = useState(bookStatus ?? BookStatus.TO_READ)

    const handleSave = async () => {
        try {
            // If userBookId exists, update existing entry
            if (userBookId) {
                updateUserBook.mutate({ userBookId: userBookId, status: selectedStatus })
            }
            // Otherwise, create a new one
            else {
                createUserBook.mutate({ bookId, status: selectedStatus })
            }
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
        <Modal>
            <BookStatusButton status={status} />
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-md bg-white">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="p-2">Book Status</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-2 flex flex-col w-full items-center">
                            {Object.values(BookStatus).map((status) => (
                                <Button className="w-full mb-2" key={status} variant={selectedStatus === status ? "primary" : "outline"} onClick={() => setSelectedStatus(status)}>
                                    {BookStatusReadable[status]}
                                </Button>
                            ))}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button slot="close" className="w-full" onClick={handleSave}>Save</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}