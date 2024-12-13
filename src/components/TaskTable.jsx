
      


import React, { useState, useMemo, useEffect } from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TaskFilters from "./TaskFilters";
import TaskCounters from "./TaskCounters";
import TaskAddForm from "./TaskAddForm";
import TaskTableView from "./TaskTableView";
import TaskPagination from "./TaskPagination";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Fetch tasks and map completed status to custom status
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        const formattedTasks = data.slice(0, 20).map((task) => {
          // Mapping completed status to custom status
          let status;
          if (task.completed) {
            status = "Done";
          } else {
            // You could add more conditions if needed
            status = "To Do";
          }

          return {
            id: task.id,
            title: task.title,
            description: task.description || "No description",
            status: status,
            originalCompleted: task.completed
          };
        });
        setTasks(formattedTasks);
      });
  }, []);

 


  // Task management functions
  const handleEdit = (id, field) => {
    setEditingTaskId(id);
    setEditingField(field);
  };

  const handleSave = () => {
    setEditingTaskId(null);
    setEditingField(null);
    toast.success("Task edited successfully!");
  };

  const handleChange = (id, key, value) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, [key]: value } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.error("Task deleted!");
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.description) {
      const newTaskObj = {
        id: tasks.length + 1,
        title: newTask.title,
        description: newTask.description,
        status: "To Do", // Default status for new tasks
        originalCompleted: false
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask({ title: "", description: "" });
      setIsAddingTask(false);
      toast.success("Task added successfully!");
    }
  };

  // Memoized calculations
  const taskCounters = useMemo(() => {
    const counters = { "To Do": 0, "In Progress": 0, "Done": 0 };
    tasks.forEach((task) => {
      if (counters[task.status] !== undefined) {
        counters[task.status]++;
      }
    });
    return counters;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = !statusFilter || task.status === statusFilter;
      const matchesGlobalFilter = !globalFilter || 
        task.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
        task.description.toLowerCase().includes(globalFilter.toLowerCase());
      return matchesStatus && matchesGlobalFilter;
    });
  }, [tasks, statusFilter, globalFilter]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Task ID",
        cell: ({ row }) => row.original.id
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
          const isEditing =
            editingTaskId === row.original.id && editingField === "title";
          return isEditing ? (
            <input
              value={row.original.title}
              onChange={(e) =>
                handleChange(row.original.id, "title", e.target.value)
              }
              onBlur={handleSave}
              className="border px-2 py-1 rounded w-full"
              autoFocus
            />
          ) : (
            <div className="flex items-center">
              {row.original.title}
              <button
                onClick={() => handleEdit(row.original.id, "title")}
                className="ml-2 text-green-500"
              >
                ✎
              </button>
            </div>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
          const isEditing =
            editingTaskId === row.original.id && editingField === "description";
          return isEditing ? (
            <input
              value={row.original.description}
              onChange={(e) =>
                handleChange(row.original.id, "description", e.target.value)
              }
              onBlur={handleSave}
              className="border px-2 py-1 rounded w-full"
              autoFocus
            />
          ) : (
            <div className="flex items-center">
              {row.original.description}
              <button
                onClick={() => handleEdit(row.original.id, "description")}
                className="ml-2 text-green-500"
              >
                ✎
              </button>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const isEditing =
            editingTaskId === row.original.id && editingField === "status";
          return isEditing ? (
            <select
              value={row.original.status}
              onChange={(e) =>
                handleChange(row.original.id, "status", e.target.value)
              }
              onBlur={handleSave}
              className="border px-2 py-1 rounded w-full"
              autoFocus
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          ) : (
            <div className="flex items-center">
              {row.original.status}
              <button
                onClick={() => handleEdit(row.original.id, "status")}
                className="ml-2 text-green-500"
              >
                ✎
              </button>
            
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleDeleteTask(row.original.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [tasks, editingTaskId, editingField]
  );

  const table = useReactTable({
    data: filteredTasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  return (
    <div className="max-w-7xl px-5 py-10 mx-auto">
      <ToastContainer autoClose={1000} />
      
     
      <h1 className="text-center text-2xl font-bold pb-8">Task List Manager</h1>
      
      <div className="flex gap-4 mb-4 justify-between items-center">
        <TaskFilters 
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          setIsAddingTask={setIsAddingTask}
        />
        <TaskCounters counters={taskCounters} />
      </div>

      {isAddingTask && (
        <TaskAddForm 
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddTask={handleAddTask}
          setIsAddingTask={setIsAddingTask}
        />
      )}

      <TaskTableView 
        table={table}
      />

      <TaskPagination table={table} />
    </div>
  );
};

export default TaskTable;

