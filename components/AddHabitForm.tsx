"use client"
import { createHabitSchema, CreateHabitSchema } from "@/lib/validations"
import { Category } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useHabitStore } from "@/lib/store"

export default function AddHabitForm() {
    const queryClient = useQueryClient()
    const { setIsFormOpen } = useHabitStore()
    const mutation = useMutation<Response, Error, {name : string, category : Category}>({
        mutationFn : async ({name , category}) => {
            return await fetch('/api/habits', {
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({
                    name : name,
                    category : category
                })
            })
        },
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ['habits']})
            reset()
            setIsFormOpen()
        }
    })
    const {register, handleSubmit, reset, formState : {errors}} = useForm<CreateHabitSchema>({
        resolver : zodResolver(createHabitSchema),
        defaultValues : {
            name : '',
            category : undefined
        },
        mode : 'onTouched'
    })

    function createHabit(formDate : CreateHabitSchema) {
        mutation.mutate({name : formDate.name, category : formDate.category})
    }
    return (
        <div>
            <h1>Add a new habit</h1>
            <form onSubmit={handleSubmit(createHabit)}>
                <div>
                    <label>
                        Habit name
                        <input 
                            {...register('name')}
                            type="text" 
                        />
                    </label>
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <label>
                        Select category
                        <select 
                            {...register('category')}
                        >
                            {Object.keys(Category).map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </label>
                    {errors.category && <p>{errors.category.message}</p>}
                </div>
            </form>
        </div>
    )
}