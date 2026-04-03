    "use client"

    import { useState } from "react"
    import { useTaskStore } from "../store/taskStore"

    export default function TaskInput() {
    const [title, setTitle] = useState("")
    const addTask = useTaskStore((state) => state.addTask)

    const handleAdd = () => {
        if (!title.trim()) return
        addTask(title)
        setTitle("")
    }

    return (
        <div className="flex gap-2 mb-6">
        <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 p-3 rounded-lg border border-dark"
        />

        <button
            onClick={handleAdd}
            className="bg-secondary text-black border border-amber-600 px-4 rounded-lg"
        >
            Add
        </button>
        </div>
    )
    }