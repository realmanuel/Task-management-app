    "use client"

    import { useTaskStore } from "../store/taskStore"

    export default function TaskList() {
    const tasks = useTaskStore((state) => state.tasks)

    return (
        <div className="space-y-3">
        {tasks.map((task) => (
            <div
            key={task.id}
            className="p-4 rounded-lg bg-primary text-dark"
            >
            {task.title}
            </div>
        ))}
        </div>
    )
    }