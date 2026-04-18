export const userBookKeys = {
    all: ['user'],
    lists: (userId: string) => [...userBookKeys.all, userId, 'list'] as const,
    detail: (userId: string, bookId: string) => [...userBookKeys.lists(userId), bookId],
};

