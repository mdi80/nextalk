
export interface ChatType {
    id: string
    to_user: string
    from_user: string
    message: string
    date: number
    saved: boolean
    seen: boolean
    reply: number | null

}


export interface OtherUserType {
    firstname: string
    lastname: string
    username: string
    phone: string
    lastActiveDateTime: string | "online"
    chats: ChatType[]
    imagePath: string | null

}