import React, { useState } from 'react';

const EditTask = ({ task, onEditTask }) => {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditTask(task._id, { name, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditTask;
