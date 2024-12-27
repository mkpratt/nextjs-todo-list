'use client';

import { useState } from "react";

const TaskListItem = ({ task }) => {

  const { id, title, description, completed, createdAt } = task;

  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const toggleEdit = () => {
    setIsBeingEdited(!isBeingEdited);
  }

  const completeTask = () => {
    console.log('completeTask');
  }

  const editTask = () => {
    console.log('editTask');
  }

  const deleteTask = () => {
    console.log('deleteTask');
  }

  // on form submit
  const saveTask = (task) => {
    console.log('saveTask', task);
  }

  return (
    <li key={id} className="w-full p-2 mb-2 border border-white border-solid rounded">
      {!isBeingEdited ? (
        <div className="flex flex-col">
          <div className="flex">
            <div className="flex flex-col flex-1">
              <h3 className="text-lg font-bold">{title}</h3>
              <p>{description}</p>
            </div>
            <button onClick={completeTask} className="p-1 px-2 mr-1 bg-green-600 rounded text-white text-base">Complete</button>
            <button onClick={editTask} className="p-1 px-2 bg-blue-600 rounded text-white text-base">Edit</button>
          </div>
          <p>{new Date(createdAt).toUTCString()}</p>
        </div>
      ) : (
        <form onSubmit={saveTask}>
          <input type="checkbox" defaultChecked={completed} />
          <div className="flex flex-col">
            <input id={id} type="text" defaultValue={title} />
            <textarea type="text" defaultValue={description} />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={toggleEdit}>Cancel</button>
        </form>
      )}
    </li>
  )
}
export default TaskListItem;