import React from 'react';

const DeleteTask = ({ onDeleteTask }) => {
  return (
    <button onClick={onDeleteTask}>Delete Task</button>
  );
};

export default DeleteTask;
