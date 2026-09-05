"use client"
import HabitList from "@/components/HabitList"
import { Habit } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useHabitStore } from "@/lib/store"
import AddHabitForm from "@/components/AddHabitForm"

export default function Home() {
  const { isFormOpen, setIsFormOpen } = useHabitStore()
  const {data, isError, isLoading} = useQuery<Habit[]>({
    queryKey : ['habits'],
    queryFn : async () => {
      const response =  await fetch('./api/habits')
      return response.json()
    }
  })
  if (isError) {
    return <p>Error occured</p>
  }
  if (isLoading) {
    return <p>Data loading</p>
  }
  return (
    <div>
      <h1>Habits</h1>
      <HabitList habitList={data ?? []}/>
      <div>
        <button
          onClick={setIsFormOpen}
        >
          Add habit
        </button>
      </div>
      <div>
        {isFormOpen && (
          <AddHabitForm/>
        )}
      </div>
    </div>
  )
}
