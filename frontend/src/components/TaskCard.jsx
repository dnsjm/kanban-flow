import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm cursor-grab">
      <h4 className="font-semibold text-gray-800">{task.title}</h4>
      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
    </div>
  );
};

export default TaskCard;
