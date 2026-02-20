"use client"

import { useUserBook } from "@/queries/useUserBook";
import { BookStatus } from "@/types/library";
import { User } from "@/types/user";

export default function BookStatusSection({ bookId, user }: { bookId: string, user?: User }) {
    const getUserBook = useUserBook({ bookId, user })

    return (
        <p>{getUserBook.data && getUserBook.data.length > 0 ? getUserBook.data[0].status : BookStatus.TO_READ}</p>
    )
}