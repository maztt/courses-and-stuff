interface HabitProps {
  completed: number
}

export function Habit(props: HabitProps) {
  return (
    <p className="bg-">{props.completed}</p>
  )
}