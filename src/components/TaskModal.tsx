"use client"

import { useState } from "react"
import { useTaskStore } from "../store/taskStore"

type Props = {
    id: string
    currentTitle: string
}

export default function TaskModal({ id, currentTitle }: Props) {

    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState(currentTitle)

    const updateTitle = useTaskStore((s) => s.updateTitle)

    const save = () => {
        updateTitle(id, title)
        setOpen(false)
    }

    return (
        <>
        <button
            onClick={() => setOpen(true)}
            className="text-xs underline"
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