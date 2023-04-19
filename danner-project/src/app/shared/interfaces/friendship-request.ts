import { Reader } from "./reader";

export interface FriendshipRequest {
    idSender: Reader,
    idReceiver: Reader,
    status: boolean
}
