import { create } from "zustand"

type Status = "todo" | "progress" | "done"
type Priority = "low" | "medium" | "high"

type Task = {
    id: string
    title: string
    status: Status
    priority: Priority
}

type TaskState = {
        tasks: Task[]
        addTask: (title: string) => void
        updateStatus: (id: string, status: Status) => void
        updatePriority: (id: string, priority: Priority) => void
        updateTitle: (id: string, title: string) => void
        deleteTask: (id: string) => void
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],

    addTask: (title) =>
        set((state) => ({
            tasks: [
            ...state.tasks,
        {
            id: crypto.randomUUID(),
            title,
            status: "todo",
            priority: "medium",
            },
            ],
    })),

    updateStatus: (id, status) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
        ),
    })),
    
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

    deleteTask: (id) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
        })),
}))