import { Entry, Habit } from "@/types";
import { differenceInCalendarDays, isToday, isYesterday } from 'date-fns'

export function calculateStreak(
    {habit} : {habit : Habit}
) : number {
    const entriesArray : Entry[] = habit?.entries || []
    if (entriesArray.length === 0) return 0
    
    const dates = entriesArray
    .map((e) => new Date(e.entryDate))
    .sort((a, b) => b.getTime() - a.getTime())

    const latestEntry = dates[0]

    if (!isToday(latestEntry) && !isYesterday(latestEntry)) return 0

    let streak = 0
    let currentExpectedDate = latestEntry

    for (const date of dates) {
        const diff = differenceInCalendarDays(currentExpectedDate, date)
        if (diff === 0) continue
        if (diff === 1) {
            streak++
            currentExpectedDate = date
        } else {
            break
        }
    }

    return streak
}