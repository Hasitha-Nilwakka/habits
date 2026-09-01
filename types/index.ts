export enum Category {
    HEALTH = 'Health',  
    LEARNING = 'Learning', 
    FITNESS = 'Fitness'
}

export interface Habit {
    id : string
    name : string
    createdAt : Date
    category : Category
    entries? : Entry[]
}

export interface Entry {
    id : string
    entryDate : Date
    habitId : string
    habit? : Habit
}