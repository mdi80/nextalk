import { OtherUserType } from "../types";


export const SortOtherUserChat = (users: OtherUserType[]) => {
    console.error(users);
    return users.slice().sort((a, b) => {
        console.error("here2");

        const fca = a.chats[0]
        const fcb = b.chats[0]
        if (!fca && !fcb) return 0
        if (!fca) return 1
        if (!fcb) return -1
        return fcb.date - fca.date
    })

}