import { prisma } from "@/lib/prisma"

export async function DELETE(request : Request) {
    const body = await request.json()
    const {id, entryDate} = body

    await prisma.entry.delete({
        where : {
            id : id,
            created_at : entryDate
        }
    })
}