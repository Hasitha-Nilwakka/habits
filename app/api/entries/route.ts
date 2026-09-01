import { prisma } from "@/lib/prisma"

export async function POST(request : Request) {
    const body = await request.json()
    const {id, entryDate, habitId} = body

    await prisma.entry.create({
        data : {
            id : id,
            created_at : entryDate,
            habit_id : habitId
        }
    })
}