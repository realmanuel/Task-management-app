"use client"

import { useMemo } from "react"
import { useTaskStore } from "@/store/taskStore"
import TaskCard from "./TaskCard"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

type Props = {
    status: "todo" | "progress" | "done"
    title: string
}

export default function StatusColumn({ status, title }: Props) {

    const { setNodeRef, isOver } = useDroppable({
        id: status,
    })

    const allTasks = useTaskStore((s) => s.tasks)
    const tasks = useMemo(
        () =>
            allTasks
                .filter((task) => task.status === status)
                .sort((a, b) => a.order - b.order),
        [allTasks, status]
    )

    return (
        <div
            ref={setNodeRef}
            className={`flex-1 bg-support p-4 rounded-xl min-h-75 transition-all duration-200 ${isOver ? "ring-2 ring-secondary/70 bg-support/95" : ""}`}
        >

            <div className="mb-4 flex items-center justify-between gap-2">
                <h2 className="font-semibold text-dark">{title}</h2>
                <span className="rounded-full bg-secondary/10 px-2 py-1 text-xs text-secondary">
                    {tasks.length} tasks
                </span>
            </div>

            <SortableContext
                items={tasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-col gap-3">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            status={task.status}
                            priority={task.priority}
                            dueDate={task.dueDate}
                            reminder={task.reminder}
                        />
                    ))}
                </div>
            </SortableContext>

        </div>
    )
}