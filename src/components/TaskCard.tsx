"use client"

import { useEffect, useState } from "react"
import { GripVertical } from "lucide-react"
import { useTaskStore } from "@/store/taskStore"
import PriorityTag from "./PriorityTag"
import TaskModal from "./TaskModal"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type Props = {
    id: string
    title: string
    status: "todo" | "progress" | "done"
    priority: "low" | "medium" | "high"
    dueDate?: string
    reminder: boolean
}

export default function TaskCard({
    id,
    title,
    status,
    priority,
    dueDate,
    reminder,
}: Props) {

    const updateStatus = useTaskStore((s) => s.updateStatus)
    const deleteTask = useTaskStore((s) => s.deleteTask)
    const updatePriority = useTaskStore((s) => s.updatePriority)

    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id })

    const transformStyle = CSS.Transform.toString(transform)
    const style = {
        transform: `${transformStyle}${isDragging ? " rotate(1.5deg)" : ""}`.trim() || undefined,
        transition,
    }

    const [now, setNow] = useState(() => Date.now())

    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    const dueDateObj = dueDate ? new Date(dueDate) : null
    const dueDateLabel = dueDateObj
        ? new Intl.DateTimeFormat("default", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          }).format(dueDateObj)
        : null
    const isOverdue = dueDateObj ? dueDateObj.getTime() < now : false
    const isDueSoon = dueDateObj
        ? dueDateObj.getTime() > now &&
          dueDateObj.getTime() - now < 24 * 60 * 60 * 1000
        : false

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-primary rounded-xl p-4 shadow transition-all duration-200 flex flex-col gap-3 ${isDragging ? "shadow-2xl border border-secondary/30" : "shadow"}`}
        >
            <div className="flex items-center justify-between gap-3">
                <button
                    ref={setActivatorNodeRef}
                    {...listeners}
                    {...attributes}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-support/90 text-dark transition hover:bg-support cursor-grab"
                    aria-label="Drag handle"
                >
                    <GripVertical size={18} />
                </button>

                <p className="text-dark font-semibold text-sm line-clamp-1">{title}</p>

                <PriorityTag priority={priority} />
            </div>

            <div className="flex flex-col gap-2">
                <select
                    value={priority}
                    onPointerDown={(e) => e.stopPropagation()}
                    onChange={(e) =>
                        updatePriority(id, e.target.value as "low" | "medium" | "high")
                    }
                    className="text-xs border rounded-full p-2"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <div className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex flex-col">
                        {dueDateLabel ? (
                            <span
                                className={`rounded-full px-2 py-1 ${
                                    isOverdue
                                        ? "bg-red-100 text-red-700"
                                        : isDueSoon
                                        ? "bg-amber-100 text-amber-700"
                                        : "bg-slate-100 text-slate-700"
                                }`}
                            >
                                {isOverdue ? "Overdue" : isDueSoon ? "Due soon" : "Due"} {dueDateLabel}
                            </span>
                        ) : (
                            <span className="text-slate-500">No due date</span>
                        )}
                    </div>
                    {reminder && <span className="text-amber-500">🔔 Reminder</span>}
                </div>
            </div>

            <TaskModal
                id={id}
                currentTitle={title}
                currentDueDate={dueDate}
                currentReminder={reminder}
            />

            <div className="flex flex-wrap gap-2 text-sm">
                {status !== "progress" && (
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => updateStatus(id, "progress")}
                        className="rounded-full px-3 py-1 text-xs font-semibold text-dark bg-support/90 hover:bg-support transition"
                    >
                        Start
                    </button>
                )}

                {status !== "done" && (
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => updateStatus(id, "done")}
                        className="rounded-full px-3 py-1 text-xs font-semibold text-white bg-green-500 hover:bg-green-600 transition"
                    >
                        Done
                    </button>
                )}

                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => deleteTask(id)}
                    className="rounded-full px-3 py-1 text-xs font-semibold text-white bg-secondary hover:bg-secondary/90 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}