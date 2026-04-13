"use client"

import { useState } from "react"
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay } from "@dnd-kit/core"
import { useTaskStore } from "../store/taskStore"
import StatusColumn from "./StatusColumn"
import TaskCard from "./TaskCard"

export default function Board() {

    const [activeId, setActiveId] = useState<string | null>(null)
    const updateStatus = useTaskStore((s) => s.updateStatus)
    const tasks = useTaskStore((s) => s.tasks)

    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id as string)
    }

    function handleDragEnd(event: DragEndEvent){

        setActiveId(null)

        const {active, over} = event

        if(!over) return

        const taskId = active.id
        const newStatus = over.id

        updateStatus(taskId as string, newStatus as "todo" | "progress" | "done")
    }

    return(
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>

        <div className="grid grid-cols-3 gap-6">

            <StatusColumn status="todo" title="Todo"/>

            <StatusColumn status="progress" title="In Progress"/>

            <StatusColumn status="done" title="Completed"/>

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