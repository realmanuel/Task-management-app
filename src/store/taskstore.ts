import {create} from "zustand"

type Task = {
    id: string
    title: string
    status: "pending" | "in-progress" | "completed"
}

type Taskstate = {
    tasks: Task[]
    addTask: (title: string) => void
}

export const useTaskStore = create<Taskstate>((set)=>({
    tasks: [],

    addTask: (title) =>
        set((state) => ({
            tasks: [
                ...state.tasks,
                {
                    id: crypto.randomUUID(),
                    title,
                    status: "pending",
                },
            ],
        })),
}))