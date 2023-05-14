import { Reader } from "./reader";

export interface FriendshipRequest {
    _id: string,
    idSender: Reader,
    idReceiver: Reader,
    status: boolean
}
