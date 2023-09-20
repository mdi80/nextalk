import { OtherUserType } from "../types";


export const SortOtherUserChat = (users: OtherUserType[]) => {
    return users.slice().sort((a, b) => {

        const fca = a.chats[0]
        const fcb = b.chats[0]
        if (!fca && !fcb) return 0
        if (!fca) return 1
        if (!fcb) return -1
        return fcb.date - fca.date
    })

}