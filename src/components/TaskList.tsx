import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');


  function handleCreateNewTask() {
    const updatedTask = [...tasks]
    if(newTaskTitle.length > 0) {
      const newTask = {
        id: Math.floor(Math.random() * 100),
        title: newTaskTitle,
        isComplete: false
      }
      updatedTask.push(newTask)
      setTasks(updatedTask)
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const updatedTask = [...tasks]
    const index = updatedTask.findIndex(el=>id === el.id)
    updatedTask[index].isComplete = !updatedTask[index].isComplete
    setTasks(updatedTask)
  }

  function handleRemoveTask(id: number) {
    const updatedTask = [...tasks]
    const index = updatedTask.findIndex(el=>id === el.id)
    updatedTask.splice(index, 1)
    setTasks(updatedTask)

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}