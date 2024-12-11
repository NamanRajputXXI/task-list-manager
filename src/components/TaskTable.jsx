import React, { useState, useEffect } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch initial data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        const formattedTasks = data.slice(0, 20).map((task) => ({
          id: task.id,
          title: task.title,
          description: "", // Default description
          status: task.completed ? "Done" : "To Do",
        }));
        setTasks(formattedTasks);
      });
  }, []);

  // Columns definition
  const columns = [
    { title: "Task ID", field: "id", width: 100 },
    { title: "Title", field: "title", editor: "input" },
    { title: "Description", field: "description", editor: "textarea" },
    {
      title: "Status",
      field: "status",
      editor: "select",
      editorParams: { values: ["To Do", "In Progress", "Done"] },
    },
    {
      title: "Actions",
      field: "actions",
      width: 200,
      align: "center",
      formatter: (cell) => {
        const task = cell.getRow().getData();
        return `
          <button class=" bg-green-600 px-4 py-1 rounded text-white mx-1" data-action="edit" data-id="${task.id}">Edit</button>
          <button class=" bg-red-600 px-4 py-1 rounded text-white " data-action="delete" data-id="${task.id}">Delete</button>
        `;
      },
      cellClick: (e, cell) => {
        const actionType = e.target.getAttribute("data-action");
        const taskId = parseInt(e.target.getAttribute("data-id"));

        if (actionType === "edit") {
          handleEditTask(taskId);
        } else if (actionType === "delete") {
          handleDeleteTask(taskId);
        }
      },
    },
  ];

  // Handle Add Task
  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: "New Task",
      description: "Task description",
      status: "To Do",
    };
    setTasks([...tasks, newTask]);
  };

  // Handle Edit Task
  const handleEditTask = (id) => {
    const editedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, title: prompt("Edit task title:", task.title) || task.title }
        : task
    );
    setTasks(editedTasks);
  };

  // Handle Delete Task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handle Filter Tasks
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    statusFilter ? task.status === statusFilter : true
  );

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-center text-2xl font-bold my-4">Task List Manager</h1>

      {/* Add Task Button */}
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
      >
        Add Task
      </button>

      {/* Filter Dropdown */}
      <select
        onChange={handleFilterChange}
        className="border px-2 py-1 rounded mb-4"
      >
        <option value="">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      {/* Task Table */}
      <ReactTabulator
        data={filteredTasks}
        columns={columns}
        layout={"fitColumns"}
        options={{ responsiveLayout: "hide" }}
      />
    </div>
  );
};

export default TaskTable;

