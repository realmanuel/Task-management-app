import { create } from "zustand"

type Status = "todo" | "progress" | "done"

type Task = {
    id: string
    title: string
    status: Status
}

type TaskState = {
        tasks: Task[]
        addTask: (title: string) => void
        updateStatus: (id: string, status: Status) => void
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
        },
        ],
})),

updateStatus: (id, status) =>
    set((state) => ({
        tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
    ),
})),

deleteTask: (id) =>
    set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
    })),
}))