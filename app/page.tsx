"use client"
import HabitList from "@/components/HabitList"
import { Habit } from "@/types"
import { useQuery } from "@tanstack/react-query"

export default function Home() {
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
    </div>
  )
}
