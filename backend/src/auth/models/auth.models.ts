export interface IUser {
    id: string,
    firstName: string,
    lastName?: string,
    email: string,
    picture?: string,
    createdAt: string
}

export interface UserRow {
    id: string,
    first_name: string,
    last_name?: string,
    email: string,
    picture?: string
    created_at: string
}