"use client"

import { BookStatus } from "@/types/library";
import { Button } from "@heroui/react";
import { BookStatusReadable } from "@/types/library";

const StatusMap = {
    [BookStatus.TO_READ]: { text: BookStatusReadable[BookStatus.TO_READ], variant: "outline", style: {} },
    [BookStatus.READ]: { text: BookStatusReadable[BookStatus.READ], variant: "primary", style: { backgroundColor: 'green' } },
    [BookStatus.READING]: { text: BookStatusReadable[BookStatus.READING], variant: "tertiary", style: {} }
}

export default function BookStatusButton({ status }: { status: BookStatus }) {

    const renderStatusButton = (status: BookStatus) => {
        const variant = StatusMap[status].variant as "primary" | "tertiary" | "outline"
        const style = StatusMap[status].style
        return (
            <Button variant={variant} style={style} className="w-[200px]">{StatusMap[status].text}</Button>
        )
    }

    return (
        <p>{status ? renderStatusButton(status) : renderStatusButton(BookStatus.TO_READ)}</p>
    )
}