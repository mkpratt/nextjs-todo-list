import TaskList from "@/app/components/TaskList";
import styles from './page.module.css';

export default async function Home() {
  const res = await fetch(`${process.env.SITE_URL}/api/tasks`, {
    method: 'GET',
    cache: 'no-store', // Ensures fresh data is fetched every time
  });

  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }

  const tasks = await res.json();

  console.log("ALL TASKS", tasks);

  return (
    <div className={`min-h-full max-h-96 m-auto py-20 ${styles.container}`}>
      <h1 className="mb-4">Tasks</h1>
      <div className="flex justify-center w-full p-4 rounded-lg border border-white border-solid">
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}