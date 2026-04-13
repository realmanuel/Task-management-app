"use client"

import { useTaskStore } from "@/store/taskStore"
import PriorityTag from "./PriorityTag"
import TaskModal from "./TaskModal"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


type Props = {
    id: string
    title: string
    status: "todo" | "progress" | "done"
    priority: "low" | "medium" | "high"
}

export default function TaskCard({
    id,
    title,
    status,
    priority,
}: Props) {

    const updateStatus = useTaskStore((s) => s.updateStatus)
    const deleteTask = useTaskStore((s) => s.deleteTask)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } =useSortable({ id })

    const style ={
        transform: CSS.Transform.toString(transform),
        transition
    }

    const updatePriority = useTaskStore((s) => s.updatePriority)


    return (
        <div 
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-primary rounded-xl p-4 shadow flex flex-col gap-3"
        >
            <select
            value={priority}
            onChange={(e) =>
                updatePriority(id, e.target.value as "low" | "medium" | "high")
            }
            className="text-xs border rounded p-1"
            >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            </select>
        {/* Task Title */}
        <div className="flex justify-between items-center">
            <p className="text-dark font-medium">{title}</p>
            <PriorityTag priority={priority} />
        </div>

        {/* Edit Modal */}
        <TaskModal id={id} currentTitle={title} />

        {/* Actions */}
        <div className="flex gap-2 text-sm">

            {status !== "progress" && (
            <button
                onClick={() => updateStatus(id, "progress")}
                className="px-2 py-1 bg-support rounded"
            >
                Start
            </button>
            )}

            {status !== "done" && (
            <button
                onClick={() => updateStatus(id, "done")}
                className="px-2 py-1 bg-green-400 rounded"
            >
                Done
            </button>
            )}

            <button
            onClick={() => deleteTask(id)}
            className="px-2 py-1 bg-secondary text-white rounded"
            >
            Delete
            </button>

        </div>

        </div>
    )
}