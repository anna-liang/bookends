"use client"

import { Button, CheckboxGroup, Modal } from "@heroui/react";
import EditShelvesButton from "./editShelvesButton";
import { useEditShelvesModal } from "./hooks/useEditShelvesModal";

export default function EditShelvesModal({ bookId, userBookId }: { bookId: string, userBookId: string }) {
    const { shelves, selectedShelves, handleClickCheckbox, handleSave } = useEditShelvesModal({ bookId, userBookId })

    return (
        <Modal>
            <EditShelvesButton />
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-md bg-white">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="p-2">Edit Shelves</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-2 flex flex-col w-full items-center">
                            <CheckboxGroup>
                                {shelves?.map((shelf) => (
                                    <Button key={shelf.id} onClick={() => handleClickCheckbox(shelf.id)} variant={selectedShelves.includes(shelf.id) ? 'primary' : 'outline'} className="w-full mb-2">
                                        {shelf.name}
                                    </Button>
                                ))}
                            </CheckboxGroup>
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