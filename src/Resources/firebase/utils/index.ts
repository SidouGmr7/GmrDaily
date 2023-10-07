export function convertTimestampToDate(time: any) {
    const timestamp = new Date(time?.seconds * 1000)

    // Define month names
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    // Extract date components
    const year = timestamp.getFullYear()
    const month = monthNames[timestamp.getMonth()]
    const day = timestamp.getDate()

    // Format the date
    return `${month} ${day}, ${year}`
}
