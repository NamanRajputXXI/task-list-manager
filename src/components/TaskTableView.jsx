// import React from 'react';
// import { flexRender } from "@tanstack/react-table";

// const TaskTableView = ({ table }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border-collapse border border-gray-200">
//         <thead className="bg-gray-100">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th 
//                   key={header.id} 
//                   className="border px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {table.getRowModel().rows.length === 0 ? (
//             <tr>
//               <td colSpan={table.getAllColumns().length} className="text-center py-4 text-sm">
//                 No tasks found
//               </td>
//             </tr>
//           ) : (
//             table.getRowModel().rows.map((row) => (
//               <tr key={row.id} className="hover:bg-gray-50">
//                 {row.getVisibleCells().map((cell) => (
//                   <td 
//                     key={cell.id} 
//                     className="px-2 sm:px-4 py-2 whitespace-nowrap text-sm"
//                   >
//                     {flexRender(
//                       cell.column.columnDef.cell,
//                       cell.getContext()
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TaskTableView;


import React from 'react';
import { flexRender } from "@tanstack/react-table";

const TaskTableView = ({ table }) => {
  return (
    <div className="overflow-x-auto md:overflow-visible">
      <div className="block md:table w-full">
        <div className="md:hidden">
          {/* Mobile view - scrollable table */}
          <div className="overflow-x-auto border border-gray-200">
            <table className="min-w-[800px] w-full">
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => (
                      <th
                        key={header.id}
                        className={`border px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                          ${index === 0 ? 'w-[10%]' : // Task ID column
                            index === 1 ? 'w-[40%]' : // Title column
                            index === 2 ? 'w-[40%]' : // Description column
                            index === 3 ? 'w-[10%]' : // Status column
                            'w-[10%]'} // Actions column
                        `}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={table.getAllColumns().length} className="text-center py-4 text-sm">
                      No tasks found
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      {row.getVisibleCells().map((cell, index) => (
                        <td
                          key={cell.id}
                          className={`px-2 sm:px-4 py-2
                            ${index === 1 || index === 2 ? 'break-words whitespace-normal' : 'whitespace-nowrap'}
                            text-sm
                          `}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Desktop view */}
        <div className="hidden md:block">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className={`border px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                        ${index === 0 ? 'w-[10%]' : // Task ID column
                          index === 1 ? 'w-[40%]' : // Title column
                          index === 2 ? 'w-[40%]' : // Description column
                          index === 3 ? 'w-[10%]' : // Status column
                          'w-[10%]'} // Actions column
                      `}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={table.getAllColumns().length} className="text-center py-4 text-sm">
                    No tasks found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell, index) => (
                      <td
                        key={cell.id}
                        className={`px-2 sm:px-4 py-2
                          ${index === 1 || index === 2 ? 'break-words whitespace-normal' : 'whitespace-nowrap'}
                          text-sm
                        `}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskTableView;