import React from 'react';

const TaskPagination = ({ table }) => {
  return (
    <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded disabled:opacity-50"
        >
          First
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded disabled:opacity-50"
        >
          Last
        </button>
      </div>
      <span className="text-xs sm:text-sm text-gray-700">
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