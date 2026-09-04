"use server"

import { prisma } from "@/lib/prisma"
import { nanoid } from "nanoid"
import { createEntrySchema } from "@/lib/validations"
import { NextResponse } from "next/server"
import { redis } from "@/lib/redis"
import { HABITS_CACHE_KEY } from "@/lib/constants"

//creating a new entry
export async function POST(request : Request) {
    try {
        const body = await request.json()

        //validate with zod
        const validation = createEntrySchema.safeParse(body)

        //zod validation failed
        if (!validation.success) {
            return NextResponse.json({
                message : 'Data validation failed',
                error : validation.error.message
            }, {status : 400})
        }

        //destructure habit key from validated zod schema
        const {habitId, entryDate} = validation.data

        //create the entry in db
        const newEntries = await prisma.entry.create({
            data : {
                id : nanoid(),
                habit_id : habitId,
                created_at : entryDate
            }
        })

        //invalidate the redis cache
        await redis.del(HABITS_CACHE_KEY)

        //return updated entries and status
        return NextResponse.json(newEntries, {status : 201})
    } catch (error) {
        //return error
        return NextResponse.json({
            message : 'failed to add entry',
            error : error
        }, {status : 500})
    }
}