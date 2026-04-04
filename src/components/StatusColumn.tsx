"use client"

import { useMemo } from "react"
import { useTaskStore } from "@/store/taskStore"
import TaskCard from "./TaskCard"

type Props = {
    status: "todo" | "progress" | "done"
    title: string
}

export default function StatusColumn({ status, title }: Props) {
    const allTasks = useTaskStore((s) => s.tasks)
    const tasks = useMemo(() =>
        allTasks.filter((task) => task.status === status), [allTasks, status]
    )

    return (
        <div className="flex-1 bg-support p-4 rounded-xl">
            <h2 className="font-semibold mb-4 text-black">
                {title}
            </h2>
            <div className="flex flex-col gap-3">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        status={task.status}
                    />
                ))}
            </div>
        </div>
    )
}