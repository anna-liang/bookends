"use client"

import { useUserBook } from "@/queries/useUserBook";
import { BookStatus } from "@/types/library";
import { User } from "@/types/user";
import { Button } from "@heroui/react";

const StatusMap = {
    [BookStatus.TO_READ]: { text: 'Want to read', variant: "outline", style: {} },
    [BookStatus.READ]: { text: 'Read', variant: "primary", style: { backgroundColor: 'green' } },
    [BookStatus.READING]: { text: 'Reading', variant: "tertiary", style: {} }
}

export default function BookStatusSection({ bookId, user }: { bookId: string, user?: User }) {
    const getUserBook = useUserBook({ bookId, user })

    const renderStatusButton = (status: BookStatus) => {
        const variant = StatusMap[status].variant as "primary" | "tertiary" | "outline"
        const style = StatusMap[status].style
        return (
            <Button variant={variant} style={style}>{StatusMap[status].text}</Button>
        )
    }

    return (
        <p>{getUserBook.data && getUserBook.data.length > 0 ? renderStatusButton(getUserBook.data[0].status) : renderStatusButton(BookStatus.TO_READ)}</p>
    )
}