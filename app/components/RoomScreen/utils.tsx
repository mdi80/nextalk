

export function getDateFromTimeStampForLastSeen(t: number): string {
    const date = new Date(t * 1000)
    const now = new Date()
    const mid = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const midLastWeek = new Date(now.getFullYear(), now.getMonth() - 7, now.getDate())
    const midLastDay = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

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