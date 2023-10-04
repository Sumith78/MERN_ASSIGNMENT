import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import DeleteTask from './components/DeleteTask';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // Fetch tasks from backend
    fetch('http://localhost:5000/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = (newTask) => {
    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then(response => response.json())
      .then(data => setTasks([...tasks, data]))
      .catch(error => console.error('Error adding task:', error));
  };

  const handleEditTask = (taskId, updatedTask) => {
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then(response => response.json())
      .then(data => {
        setTasks(tasks.map(task => (task._id === taskId ? data : task)));
        setEditingTask(null);
      })
      .catch(error => console.error('Error editing task:', error));
  };

  const handleDeleteTask = (taskId) => {
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => setTasks(tasks.filter(task => task._id !== taskId)))
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskList tasks={tasks} />
      <AddTask onAddTask={handleAddTask} />
      {editingTask && (
        <EditTask task={editingTask} onEditTask={handleEditTask} />
      )}
     
      {editingTask && (
        <EditTask task={editingTask} onEditTask={handleEditTask} />
      )}
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.name}
            <button onClick={() => setEditingTask(task)}>Edit</button>
            <DeleteTask onDeleteTask={() => handleDeleteTask(task._id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
