import React from 'react';

const TaskFilters = ({
  globalFilter,
  setGlobalFilter,
  statusFilter,
  setStatusFilter,
  setIsAddingTask,
  className
}) => (
  <div className={`flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 ${className}`}>
    <div className="relative flex-grow">
      <input
        type="text"
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search tasks..."
        className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 absolute left-2 top-3 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full sm:w-auto"
    >
      <option value="">All Status</option>
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
    
    <button
      onClick={() => setIsAddingTask(true)}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm w-full sm:w-auto"
    >
      + Add New Task
    </button>
  </div>
);

export default TaskFilters;