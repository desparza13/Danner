import { Book } from "./book";
import { Reader } from "./reader";

export interface Review {
    _id: string,
    bookId: Book,
    userId: Reader,
    rating: number,
    description: string,
    likes: Array<Reader>,
    __v?:number
}
