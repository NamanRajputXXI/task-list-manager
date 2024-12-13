import React from 'react';

const TaskPagination = ({ table }) => {
  return (
    <div className="mt-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          First
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Last
        </button>
      </div>
      <span className="text-sm text-gray-700">
        Page{" "}
        <strong>
          {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </strong>
      </span>
    </div>
  );
};

export default TaskPagination;