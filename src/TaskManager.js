import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, CheckCircle, Circle } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Select } from './components/ui/select'
import { Textarea } from './components/ui/textarea'

function Card({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white bg-opacity-20 backdrop-blur-lg shadow rounded-lg p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function TaskManager({ searchTerm }) {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium'
  })
  const [sortOption, setSortOption] = useState('created')
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTask.title.trim() !== '') {
      setTasks([...tasks, { ...newTask, id: Date.now().toString(), completed: false }])
      setNewTask({ title: '', description: '', priority: 'medium' })
    }
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  const editTask = (task) => {
    setEditingTask(task)
  }

  const updateTask = () => {
    if (editingTask) {
      setTasks(tasks.map(task => task.id === editingTask.id ? editingTask : task))
      setEditingTask(null)
    }
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    } else if (sortOption === 'alphabetical') {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  return (
    <div>
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Add New Task</h2>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70"
          />
          <Textarea
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70"
          />
          <Select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            className="bg-white bg-opacity-20 text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </div>
        <Button onClick={addTask} className="w-full mt-4">
          <Plus className="inline-block mr-2 h-4 w-4" /> Add Task
        </Button>
      </Card>

      <div className="mb-4 flex justify-end">
        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-white bg-opacity-20 text-white"
        >
          <option value="created">Created</option>
          <option value="priority">Priority</option>
          <option value="alphabetical">Alphabetical</option>
        </Select>
      </div>

      <AnimatePresence>
        {sortedTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>{task.title}</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-300" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editTask(task)}
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    <Edit2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-200">{task.description}</p>
              <div className="mt-2 flex items-center">
                <span className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${
                  task.priority === 'high' ? 'bg-red-200 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-green-200 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {editingTask && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <Card className="w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-white">Edit Task</h2>
            <div className="space-y-4">
              <Input
                type="text"
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70"
              />
              <Textarea
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70"
              />
              <Select
                value={editingTask.priority}
                onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                className="bg-white bg-opacity-20 text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setEditingTask(null)} className="text-white border-white hover:bg-white hover:bg-opacity-20">Cancel</Button>
              <Button onClick={updateTask}>Save</Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}