import React from 'react';

const TaskAddForm = ({ newTask, setNewTask, handleAddTask, setIsAddingTask }) => (
  <div className="mb-4 space-y-2">
    <input
      type="text"
      placeholder="Title"
      value={newTask.title}
      onChange={(e) =>
        setNewTask({ ...newTask, title: e.target.value })
      }
      className="border px-2 py-1 rounded w-full text-sm"
    />
    <textarea
      placeholder="Description"
      value={newTask.description}
      onChange={(e) =>
        setNewTask({ ...newTask, description: e.target.value })
      }
      className="border px-2 py-1 rounded w-full text-sm"
    />
    <div className="flex space-x-2">
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded text-sm flex-grow"
      >
        Add Task
      </button>
      <button
        onClick={() => setIsAddingTask(false)}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default TaskAddForm;