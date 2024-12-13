// components/TaskCounters.js
import React from 'react';

const TaskCounters = ({ counters }) => (
  <div className="flex gap-2 justify-around text-sm font-semibold">
    <div className="flex justify-center p-3 items-center border">
      To Do: {counters["To Do"]}
    </div>
    <div className="flex justify-center p-3 items-center border">
      In Progress: {counters["In Progress"]}
    </div>
    <div className="flex justify-center p-3 items-center border">
      Done: {counters["Done"]}
    </div>
  </div>
);

export default TaskCounters;