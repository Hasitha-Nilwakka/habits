'use server'
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createHabitSchema } from "@/lib/validations";
import { nanoid } from "nanoid";
import { redis } from "@/lib/redis";
import { HABITS_CACHE_KEY } from "@/lib/constants";

//fetching habits
export async function GET() {
    try {
        //check if the cache is available and return the cache result
        const cachedhabits = await redis.get(HABITS_CACHE_KEY)
        if (cachedhabits) {
            return NextResponse.json(JSON.parse(cachedhabits))
        }

        //if no cache fetch from db
        const habits = await prisma.habit.findMany({
            include : {
                entries : true
            }
        })

        //set the fetched data redis cache
        await redis.set(HABITS_CACHE_KEY, JSON.stringify(habits), "EX", 3600)

        return NextResponse.json(habits)
    } catch (error) {
        return NextResponse.json({message : 'Failed to fetch data', error}, {status : 500})
    }
}

//creating a habit
export async function POST(request : Request) {

    try {
        //await data
        const body = await request.json()
    
        //parse through zod schema
        const validation = createHabitSchema.safeParse(body)
        
        //validation failed, respond error
        if (!validation.success) {
            return NextResponse.json({
                message : 'Data validation failed',
                error : validation.error.message
            }, {status : 400})
        }
        
        //destructure validated data
        const {name, category} = validation.data
    
        //create the record in db
        const newHabits = await prisma.habit.create({
            data : {
                id : nanoid(),
                name : name,
                category : category
            }
        })

        //delete the old cache, new cache will be created in fetching
        await redis.del(HABITS_CACHE_KEY)

        //respond the new habits and status
        return NextResponse.json(newHabits, {status : 201})
    }catch (error) {
        return NextResponse.json({message : 'Failed to create habit', error}, {status : 500})
    }
}