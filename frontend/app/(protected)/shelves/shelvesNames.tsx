"use client"

import { useShelves } from "@/queries/useShelves"
import { User } from "@/types/user"

export default function ShelvesNames({ user }: { user: User }) {
    const { data, isLoading, error } = useShelves()
    if (!user) {
        return null
    }
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
        <ul>
            {data.map((shelf) => (<li key={shelf.id}>{shelf.name}</li>))}
        </ul>
    )
}