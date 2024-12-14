import React from 'react';

const TaskCounters = ({ counters, className }) => (
  <div className={`flex flex-wrap gap-2 justify-around text-xs sm:text-sm font-semibold ${className}`}>
    <div className="flex justify-center p-2 sm:p-3 items-center border rounded-md">
      To Do: {counters["To Do"]}
    </div>
    <div className="flex justify-center p-2 sm:p-3 items-center border rounded-md">
      In Progress: {counters["In Progress"]}
    </div>
    <div className="flex justify-center p-2 sm:p-3 items-center border rounded-md">
      Done: {counters["Done"]}
    </div>
  </div>
);

export default TaskCounters;