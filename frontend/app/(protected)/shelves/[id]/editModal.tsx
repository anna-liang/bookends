"use client"

import { Button, Calendar, DateField, Input, Label, ListBox, Modal, Surface, TextField } from "@heroui/react";
import { useUpdateUserBook } from "@/queries/useUpdateUserBook";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Edit01 } from "@untitledui/icons";
import { BookStatus, ShelfBook } from "@/types/library";
import { formatAuthors } from "@/utils/helpers";
import { Select } from "@heroui/react";
import { useShelves } from "@/queries/useShelves";
import { DatePicker } from "react-aria-components";

export default function EditModal({ book }: { book: ShelfBook }) {
    console.log(book)
    const updateBook = useUpdateUserBook()
    const getShelves = useShelves()
    const shelfNames = getShelves.data?.map((shelf) => shelf.name)

    const renderSelect = ({ title, items, isMultiple, placeholder }: { title: string, items: string[] | number[] | undefined, isMultiple: boolean, placeholder: string }) => {
        return (
            <Select placeholder={placeholder} className="bg-white" selectionMode={isMultiple ? "multiple" : "single"}>
                <Label>{title}</Label>
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox className="bg-white">
                        {items ? items.map((item) => (
                            <ListBox.Item id={item} textValue={`${item}`} key={item}>
                                {item}
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        )) : <div></div>}
                    </ListBox>
                </Select.Popover>
            </Select>
        )
    }

    return (
        <Modal>
            <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-md bg-white">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="p-2"><span className="font-bold">{book.title}</span> by {formatAuthors(book.authors)}</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-2">
                            <Surface variant="default">
                                <form className="flex flex-col gap-4">
                                    {renderSelect({ title: 'Rating', placeholder: 'Select one', items: [1, 2, 3, 4, 5], isMultiple: false })}
                                    {renderSelect({ title: 'Status', placeholder: 'Select one', items: [BookStatus.READ, BookStatus.READING, BookStatus.TO_READ], isMultiple: false })}
                                    {renderSelect({ title: 'Shelves', placeholder: 'Select shelves', items: shelfNames, isMultiple: true })}
                                    {/* <DatePicker name="date" value={book.readAt} onChange={setValue}>
                                        <Label>Date</Label>
                                        <DateField.Group fullWidth>
                                            <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                                            <DateField.Suffix>
                                                <DatePicker.Trigger>
                                                    <DatePicker.TriggerIndicator />
                                                </DatePicker.Trigger>
                                            </DateField.Suffix>
                                        </DateField.Group>
                                        <DatePicker.Popover>
                                            <Calendar aria-label="Event date">
                                                <Calendar.Header>
                                                    <Calendar.YearPickerTrigger>
                                                        <Calendar.YearPickerTriggerHeading />
                                                        <Calendar.YearPickerTriggerIndicator />
                                                    </Calendar.YearPickerTrigger>
                                                    <Calendar.NavButton slot="previous" />
                                                    <Calendar.NavButton slot="next" />
                                                </Calendar.Header>
                                                <Calendar.Grid>
                                                    <Calendar.GridHeader>
                                                        {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                                    </Calendar.GridHeader>
                                                    <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                                                </Calendar.Grid>
                                                <Calendar.YearPickerGrid>
                                                    <Calendar.YearPickerGridBody>
                                                        {({ year }) => <Calendar.YearPickerCell year={year} />}
                                                    </Calendar.YearPickerGridBody>
                                                </Calendar.YearPickerGrid>
                                            </Calendar>
                                        </DatePicker.Popover>
                                    </DatePicker> */}
                                </form>
                            </Surface>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button slot="close" className="w-full">Save</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}