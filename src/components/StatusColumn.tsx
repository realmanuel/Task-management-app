"use client"

import { useMemo } from "react"
import { useTaskStore } from "@/store/taskStore"
import TaskCard from "./TaskCard"

import { useDroppable } from "@dnd-kit/core"

type Props = {
    status: "todo" | "progress" | "done"
    title: string
}

export default function StatusColumn({ status, title }: Props) {

    const { setNodeRef } = useDroppable({
        id: status,
    })

    const allTasks = useTaskStore((s) => s.tasks)
    const tasks = useMemo(() => allTasks.filter((task) => task.status === status), [allTasks, status])

    return (
        <div
        ref={setNodeRef}
        className="flex-1 bg-support p-4 rounded-xl min-h-75"
        >

        <h2 className="font-semibold mb-4 text-dark">
            {title}
        </h2>

        <div className="flex flex-col gap-3">
            {tasks.map((task) => (
            <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                status={task.status}
                priority={task.priority}
            />
            ))}
        </div>

        </div>
    )
    }