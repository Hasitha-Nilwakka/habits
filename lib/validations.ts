import { Category } from '@/types'
import * as z from 'zod'

const CategoryEnum = z.enum(Category)

export const createHabitSchema = z.object({
    name : z.string().trim().min(4, 'habit must be atleast 4 characters'),
    category : CategoryEnum
})

export const createEntrySchema = z.object({
    entryDate : z.date(),
    habitId : z.uuid()
})

export const updateHabitSchema = createHabitSchema.partial({
    category : true,
    name : true
})

export type CreateHabitSchema = z.infer<typeof createHabitSchema>
export type CreateEntrySchema = z.infer<typeof createEntrySchema>
export type UpdateHabitSchema = z.infer<typeof updateHabitSchema>


