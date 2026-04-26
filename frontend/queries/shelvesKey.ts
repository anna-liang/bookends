export const shelvesKey = {
    all: ['shelves'] as const,
    lists: () => [...shelvesKey.all, 'list'] as const,
    book: (bookId: string) => [...shelvesKey.all, 'book', bookId] as const,
    detail: (id: string) =>
        [...shelvesKey.all, 'detail', id] as const,
}
