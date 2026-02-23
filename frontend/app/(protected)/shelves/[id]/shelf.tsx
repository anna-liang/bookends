"use client"

import { useShelf } from "@/queries/useShelf"
import ShelfTable from "./shelfTable"

export default function Shelf({ id }: { id: string }) {
    const { data } = useShelf({ id })

    return (
        <div className="mt-12"><ShelfTable shelf={data} /></div>
    )
}