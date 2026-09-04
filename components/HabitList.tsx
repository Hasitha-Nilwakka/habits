import { Habit } from "@/types";
import HabitCard from "./HabitCard";

export default function HabitList({habitList} : {habitList : Habit[]}) {
    return (
        <div>
            {habitList.map((h) => (
                <HabitCard key={h.id} habit={h} />
            ))}
        </div>
    )
}