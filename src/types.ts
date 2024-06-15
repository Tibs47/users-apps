export interface User {
    id: number,
    email: string,
    name: string,
    lastName: string,
    dob: Date,
    active: boolean,
}
export interface App {
    id: number,
    name: string,
    version: string,
    url: string,
}
export interface Relations {
    id: number,
    appId: number,
    userId: number,
}
export interface UsersApps{
    user: User,
    relationIds: Relations[],
}
export interface OpenMenu {
    id: number,
    open: boolean,
}