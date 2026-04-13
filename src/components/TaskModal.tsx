"use client"

import { useEffect, useState } from "react"
import { useTaskStore } from "../store/taskStore"

type Props = {
    id: string
    currentTitle: string
    currentDueDate?: string
    currentReminder: boolean
}

export default function TaskModal({
    id,
    currentTitle,
    currentDueDate = "",
    currentReminder = false,
}: Props) {

    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState(currentTitle)
    const [dueDate, setDueDate] = useState(currentDueDate)
    const [reminder, setReminder] = useState(currentReminder)

    const updateTitle = useTaskStore((s) => s.updateTitle)
    const updateDueDate = useTaskStore((s) => s.updateDueDate)
    const updateReminder = useTaskStore((s) => s.updateReminder)

    useEffect(() => {
        setTitle(currentTitle)
        setDueDate(currentDueDate || "")
        setReminder(currentReminder)
    }, [currentTitle, currentDueDate, currentReminder])

    const save = () => {
        updateTitle(id, title)
        updateDueDate(id, dueDate || undefined)
        updateReminder(id, reminder)
        setOpen(false)
    }

    return (
        <>
            <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setOpen(true)}
                className="rounded-full border border-support/50 px-3 py-1 text-xs font-semibold text-dark transition hover:bg-support/10"
            >
                Edit
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                    <div className="bg-neutral p-6 rounded-xl w-80">

                        <h2 className="text-dark font-semibold mb-4">
                            Edit Task
                        </h2>

                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border p-2 w-full mb-4"
                        />

                        <input
                            type="datetime-local"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="border p-2 w-full mb-4"
                        />

                        <label className="flex items-center gap-2 text-sm mb-4">
                            <input
                                type="checkbox"
                                checked={reminder}
                                onChange={(e) => setReminder(e.target.checked)}
                                className="accent-secondary"
                            />
                            Reminder
                        </label>

                        <button
                            onClick={save}
                            className="bg-secondary text-green px-3 py-1 rounded"
                        >
                            Save
                        </button>

                    </div>

                </div>
            )}
        </>
    )
}