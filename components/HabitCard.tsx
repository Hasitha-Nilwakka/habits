"use client"
import { Habit } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function HabitCard({habit} : {habit : Habit}) {
    const queryClient = useQueryClient()
    const checkEntry = useMutation<Response, Error, { habitId: string; date: string }>({
        mutationFn : async ({ habitId, date }) => {
            return await fetch('/api/entries', {
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({
                    habitId : habitId,
                    entryDate : date
                })
            })
        },
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey: ['habits']})
        }
    })

    const removeEntry = useMutation<Response, Error, {entryId : string}>({
        mutationFn : async ({entryId}) => {
            return await fetch(`/api/entries/${entryId}`, {
                method : 'DELETE'
            })
        },
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey: ['habits']})
        }
    })

    const today = new Date().toLocaleDateString()

    const todayEntry = habit.entries?.find(e => new Date(e.entryDate).toLocaleDateString() === today)
    
    return (
        <div>
            <label>
                {habit.name}
                <input 
                    type="checkbox" 
                    id={habit.id} 
                    checked={todayEntry !== undefined}
                    onChange={
                        todayEntry !== undefined ?
                        () => removeEntry.mutate({entryId : todayEntry.id}) :
                        () => checkEntry.mutate({habitId : habit.id, date : today})
                    }
                />
            </label>
        </div>
    )
}