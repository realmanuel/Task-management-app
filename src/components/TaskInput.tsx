"use client"

import { useState } from "react"
import { useTaskStore } from "../store/taskStore"

export default function TaskInput() {
    const [title, setTitle] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [reminder, setReminder] = useState(false)
    const addTask = useTaskStore((state) => state.addTask)

    const handleAdd = () => {
        if (!title.trim()) return
        addTask(title, dueDate || undefined, reminder)
        setTitle("")
        setDueDate("")
        setReminder(false)
    }

    return (
        <div className="flex flex-col gap-3 mb-6">
            <div className="flex gap-2">
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

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full rounded-lg border border-dark p-2"
                />
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={reminder}
                        onChange={(e) => setReminder(e.target.checked)}
                        className="accent-secondary"
                    />
                    Reminder
                </label>
            </div>
        </div>
    )
}