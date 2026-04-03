import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral p-10">
        <h1 className="text-3xl font-bold mb-8 text-dark">
          Task Manager
        </h1>

        <TaskInput/>
        <TaskList />
    </main>
  );
}
