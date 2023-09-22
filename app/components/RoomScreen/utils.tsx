import { ChatType } from "../../types"

export function isDatesInSameDay(t1: number, t2: number) {

    const date1 = new Date(t1)
    const date2 = new Date(t2)

    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();

}

export function getDateOfMessage(t: number) {
    const date = new Date(t)

    const now = new Date()
    const mid = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const midLastWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
    const midLastDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)

    if (mid.getTime() < date.getTime()) {
        return "Today"
    } else if (midLastDay.getTime() < date.getTime()) {
        return "Yesterday"
    } else if (midLastWeek.getTime() < date.getTime()) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()]
    } else {
    }

}



export function getDateFromTimeStampForLastSeen(t: number): string {
    const date = new Date(t * 1000)
    const now = new Date()
    const mid = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const midLastWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
    const midLastDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)

    if (mid.getTime() < date.getTime()) {

        return "last seen at " + formatTime(date)
    } else if (midLastDay.getTime() < date.getTime()) {
        return "last seen yesterday"
    } else if (midLastWeek.getTime() < date.getTime()) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return "last seen at " + days[date.getDay()]
    } else {
        return "last seen within a week"
    }
}

export function getTimeForMessage(t: number): string {
    const date = new Date(t)

    return formatTime(date)
}

function formatTime(date: Date) {
    const hours = String(date.getHours())
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear())
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    return `${monthNames[date.getMonth()]} ${day},${year}`;
}