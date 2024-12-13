// components/TaskAddForm.js
import React from 'react';

const TaskAddForm = ({ newTask, setNewTask, handleAddTask }) => (
  <div className="mb-4">
    <input
      type="text"
      placeholder="Title"
      value={newTask.title}
      onChange={(e) =>
        setNewTask({ ...newTask, title: e.target.value })
      }
      className="border px-2 py-1 rounded w-full mb-2"
    />
    <textarea
      placeholder="Description"
      value={newTask.description}
      onChange={(e) =>
        setNewTask({ ...newTask, description: e.target.value })
      }
      className="border px-2 py-1 rounded w-full"
    />
    <div className="mt-2">
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </div>
  </div>
);

export default TaskAddForm;