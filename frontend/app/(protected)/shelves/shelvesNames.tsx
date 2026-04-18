"use client"

import { useBook } from "@/queries/useBook"
import { useShelves } from "@/queries/useShelves"
import Link from "next/link"

export default function ShelvesNames() {
    useBook({ id: 'fo4rzdaHDAwC' })
    const { data, isLoading, error } = useShelves()

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        throw error
    }
    if (!data) {
        return null
    }

    return (
        <div>
            <p className="text-md font-bold">BOOKSHELVES</p>
            <ul>
                {data.map((shelf) => (<li key={shelf.id}><Link href={`/shelves/${shelf.id}`}>{shelf.name}</Link></li>))}
            </ul>
        </div>
    )
}