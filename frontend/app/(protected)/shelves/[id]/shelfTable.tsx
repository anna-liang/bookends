import { BookStatus, Shelf } from "@/types/library";
import { Table, TableCard } from "@/components/application/table/table";
import { Edit01 } from "@untitledui/icons";
import dayjs from "dayjs";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { BookThumbnail } from "@/components/image/bookThumbnail";
import Link from "next/link";
import DeleteButton from "./deleteButton";

const StatusMap = {
    [BookStatus.TO_READ]: { text: 'Want to read' },
    [BookStatus.READ]: { text: 'Read' },
    [BookStatus.READING]: { text: 'Reading' }
}

export default function ShelfTable({ shelf }: { shelf: Shelf }) {
    if (!shelf) return null

    return (
        <TableCard.Root>
            <TableCard.Header title={shelf.name} description={shelf.description} />
            <Table>
                <Table.Header>
                    <Table.Head id="cover" label="Cover" />
                    <Table.Head id="name" label="Name" isRowHeader allowsSorting />
                    <Table.Head id="authors" label="Authors" allowsSorting />
                    <Table.Head id="rating" label="Rating" allowsSorting />
                    <Table.Head id="status" label="Status" allowsSorting />
                    <Table.Head id="read_at" label="Read At" allowsSorting />
                    <Table.Head id="added_at" label="Added At" allowsSorting />
                    <Table.Head id="actions" />
                </Table.Header>
                <Table.Body items={shelf.books}>
                    {(item) => (
                        <Table.Row id={item.bookId}>
                            <Table.Cell>
                                <Link href={`/book/${item.bookId}`}>
                                    <BookThumbnail src={item.thumbnail} width={50} height={50} alt={item.title} />
                                </Link>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap"><Link href={`/book/${item.bookId}`} className="hover:underline">{item.title}</Link></Table.Cell>
                            <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.authors}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.userRating}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{StatusMap[item.status].text}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.readAt ? dayjs(item.readAt).format('MMM D, YYYY') : ''}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{dayjs(item.addedAt).format('MMM D, YYYY')}</Table.Cell>
                            <Table.Cell className="px-4">
                                <div className="flex justify-end gap-0.5">
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                    <DeleteButton shelfId={shelf.id} userBookId={item.userBookId} />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </TableCard.Root>
    )
}