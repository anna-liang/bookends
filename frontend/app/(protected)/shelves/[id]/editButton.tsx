
"use client"

import { ShelfBook } from "@/types/library";
import EditModal from "./editModal";

export default function EditButton({ book }: { book: ShelfBook }) {

    return (
        <div>
            <EditModal book={book} />
        </div>
    )
}