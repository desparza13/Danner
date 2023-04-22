export interface Reader {
    _id: string,
    name: string,
    user: string,
    email: string,
    city: string,
    image?: string,
    password: string
    read: Array<object>,
    toBeRead: Array<string>,
    reading:Array<string>,
    friends: Array<string>,
    __v?:number,
    readingChallenge: number
}
