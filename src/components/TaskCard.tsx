    "use client"

    import { useTaskStore } from "@/store/taskStore"

    type Props = {
    id: string
    title: string
    status: "todo" | "progress" | "done"
    }

    export default function TaskCard({ id, title, status }: Props) {
    const updateStatus = useTaskStore((s) => s.updateStatus)
    const deleteTask = useTaskStore((s) => s.deleteTask)

    return (
        <div className="bg-primary rounded-xl p-3 shadow flex flex-col gap-2">

        <p className="text-dark font-medium">{title}</p>

        <div className="flex gap-2 text-sm">

            <button
            onClick={() => updateStatus(id, "progress")}
            className="px-2 py-1 bg-support rounded"
            >
            Start
            </button>

            <button
            onClick={() => updateStatus(id, "done")}
            className="px-2 py-1 bg-green-400 rounded"
            >
            Done
            </button>

            <button
            onClick={() => deleteTask(id)}
            className="px-2 py-1 bg-secondary rounded"
            >
            Delete
            </button>

        </div>

        </div>
    )
    }