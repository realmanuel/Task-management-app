"use client"

import { useState } from "react"
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    DragOverlay,
} from "@dnd-kit/core"
import { useTaskStore } from "../store/taskStore"
import StatusColumn from "./StatusColumn"
import TaskCard from "./TaskCard"

export default function Board() {

    const [activeId, setActiveId] = useState<string | null>(null)
    const updateStatus = useTaskStore((s) => s.updateStatus)
    const reorderTask = useTaskStore((s) => s.reorderTask)
    const tasks = useTaskStore((s) => s.tasks)

    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id as string)
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event

        if (!over || active.id === over.id) return

        const activeTask = tasks.find((task) => task.id === active.id)
        const overTask = tasks.find((task) => task.id === over.id)

        if (!activeTask || !overTask) return
        if (activeTask.status !== overTask.status) return

        reorderTask(active.id as string, over.id as string)
    }

    function handleDragEnd(event: DragEndEvent) {
        setActiveId(null)

        const { active, over } = event

        if (!over) return

        const activeTask = tasks.find((task) => task.id === active.id)
        if (!activeTask) return

        let newStatus: "todo" | "progress" | "done" | null = null

        if (over.id === "todo" || over.id === "progress" || over.id === "done") {
            newStatus = over.id
        } else {
            const overTask = tasks.find((task) => task.id === over.id)
            if (overTask) newStatus = overTask.status
        }

        if (!newStatus || newStatus === activeTask.status) return

        updateStatus(active.id as string, newStatus)
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >

            <div className="grid grid-cols-3 gap-6">

                <StatusColumn status="todo" title="Todo" />

                <StatusColumn status="progress" title="In Progress" />

                <StatusColumn status="done" title="Completed" />

            </div>

            <DragOverlay>
                {activeId ? (
                    <TaskCard
                        {...tasks.find((task) => task.id === activeId)!}
                    />
                ) : null}
            </DragOverlay>

        </DndContext>
    )
}