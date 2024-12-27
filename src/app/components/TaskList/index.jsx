'use client';

import { useRef, useState } from 'react';
import TaskListItem from '@/app/components/TaskListItem';

const TaskList = ({ tasks }) => {

  const [allTasks, setAllTasks] = useState(tasks);
  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current.showModal();
  }

  const closeDialog = () => {
    dialogRef.current.close();
  }

  const createTask = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log([...data.entries()])

    const title = data.get('title');
    const description = data.get('description');

    // get form values and submit to db
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        const newTask = await res.json();
        console.log('Task created:', newTask);
        // reset the form
        e.target.reset();

        setAllTasks([...allTasks, newTask]);
      } else {
        console.error('Failed to create task');
      }
      closeDialog();
    } catch (error) {
      console.error("Error creating task", error);
    }
  }

  return (
    <div className="w-full flex flex-col">
      {!!allTasks?.length && (
        <ul className="w-full flex flex-col">
          {allTasks
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map(task => (
              <TaskListItem key={task.id} task={task} />
            ))
          }
        </ul>
      )}

      <button className="p-2 px-6 rounded bg-yellow-400 text-black text-base" onClick={openDialog}>New Task</button>

      <dialog ref={dialogRef} className="p-4 bg-black border border-white border-solid rounded-lg">
        <h2 className="mb-4 text-white">New Task</h2>
        <form onSubmit={createTask} className="flex flex-col p-4">
          <input type="text" placeholder="Title" name="title" required className="p-2 mb-4 rounded-sm border border-white bg-transparent text-white" />
          <textarea placeholder="Description" name="description" className="p-2 mb-6 rounded-sm border border-white bg-transparent text-white" />
          <div className="flex justify-center space-x-4">
            <button type="button" onClick={closeDialog} className="p-2 px-6 border border-white border-solid rounded text-white text-base">Cancel</button>
            <button type="submit" className="p-2 px-6 bg-green-700 rounded text-white text-base">Create</button>
          </div>
        </form>
      </dialog>
    </div>
  )
}
export default TaskList;