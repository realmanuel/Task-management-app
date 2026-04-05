"use client"

import { DndContext } from "@dnd-kit/core"
import { useTaskStore } from "../store/taskStore"
import StatusColumn from "./StatusColumn"

export default function Board() {

    const updateStatus = useTaskStore((s) => s.updateStatus)

    function handleDragEnd(event:any){

        const {active, over} = event

        if(!over) return

        const taskId = active.id
        const newStatus = over.id

        updateStatus(taskId,newStatus)
    }

    return(
        <DndContext onDragEnd={handleDragEnd}>

        <div className="grid grid-cols-3 gap-6">

            <StatusColumn status="todo" title="Todo"/>

            <StatusColumn status="progress" title="In Progress"/>

            <StatusColumn status="done" title="Completed"/>

        </div>

        </DndContext>
    )
}