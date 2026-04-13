import { create } from "zustand"
import { arrayMove } from "@dnd-kit/sortable"

type Status = "todo" | "progress" | "done"
type Priority = "low" | "medium" | "high"

type Task = {
    id: string
    title: string
    status: Status
    priority: Priority
    dueDate?: string
    reminder: boolean
    order: number
}

type TaskState = {
    tasks: Task[]
    addTask: (title: string, dueDate?: string, reminder?: boolean) => void
    updateStatus: (id: string, status: Status) => void
    updatePriority: (id: string, priority: Priority) => void
    updateTitle: (id: string, title: string) => void
    updateDueDate: (id: string, dueDate?: string) => void
    updateReminder: (id: string, reminder: boolean) => void
    reorderTask: (activeId: string, overId: string) => void
    deleteTask: (id: string) => void
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],

    addTask: (title, dueDate, reminder = false) =>
        set((state) => {
            const nextOrder =
                Math.max(-1, ...state.tasks.filter((task) => task.status === "todo").map((task) => task.order)) + 1

            return {
                tasks: [
                    ...state.tasks,
                    {
                        id: crypto.randomUUID(),
                        title,
                        status: "todo",
                        priority: "medium",
                        dueDate,
                        reminder,
                        order: nextOrder,
                    },
                ],
            }
        }),

    updateStatus: (id, status) =>
        set((state) => {
            const nextOrder =
                Math.max(-1, ...state.tasks.filter((task) => task.status === status).map((task) => task.order)) + 1

            return {
                tasks: state.tasks.map((task) =>
                    task.id === id ? { ...task, status, order: nextOrder } : task
                ),
            }
        }),

    updatePriority: (id, priority) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, priority } : task
            ),
        })),

    updateTitle: (id, title) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, title } : task
            ),
        })),

    updateDueDate: (id, dueDate) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, dueDate } : task
            ),
        })),

    updateReminder: (id, reminder) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, reminder } : task
            ),
        })),

    reorderTask: (activeId, overId) =>
        set((state) => {
            const activeTask = state.tasks.find((task) => task.id === activeId)
            const overTask = state.tasks.find((task) => task.id === overId)

            if (!activeTask || !overTask || activeTask.status !== overTask.status) {
                return { tasks: state.tasks }
            }

            const sameStatusTasks = state.tasks
                .filter((task) => task.status === activeTask.status)
                .sort((a, b) => a.order - b.order)

            const activeIndex = sameStatusTasks.findIndex((task) => task.id === activeId)
            const overIndex = sameStatusTasks.findIndex((task) => task.id === overId)

            if (activeIndex === -1 || overIndex === -1) {
                return { tasks: state.tasks }
            }

            const reorderedTasks = arrayMove(sameStatusTasks, activeIndex, overIndex).map((task, index) => ({
                ...task,
                order: index,
            }))

            return {
                tasks: state.tasks.map((task) => {
                    if (task.status !== activeTask.status) return task
                    const updated = reorderedTasks.find((reordered) => reordered.id === task.id)
                    return updated ?? task
                }),
            }
        }),

    deleteTask: (id) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
        })),
}))