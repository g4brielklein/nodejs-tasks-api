import { randomUUID } from 'node:crypto'
import { database } from './database.js'
import { getQueryParams } from './utils/get-query-params.js'

const db = new database()
const targetTable = 'tasks'

export const routes = [
  {
    url: getQueryParams('/tasks'),
    method: 'GET',
    handler: (req, res) => {
      const tasks = db.select(targetTable)

      return res
      .end(JSON.stringify(tasks))
    }
  },
  {
    url: getQueryParams('/tasks'),
    method: 'POST',
    handler: async (req, res) => {
      const { title, description } = req.body
      const created_at = new Date()

      if (!title || !description) {
        return res.writeHead(400).end('Both title and description are required')
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at,
        updated_at: created_at,
      }

      db.create(targetTable, task)

      return res.writeHead(201).end()
    }
  },
  {
    url: getQueryParams('/tasks/:id'),
    method: 'PUT',
    handler: (req, res) => {
      const { title, description } = req.body
      const { id } = req.params

      if (!title || !description) {
        return res.writeHead(400).end('Both title and description are required')
      }

      const foundTask = db.selectById(targetTable, id)

      if (!foundTask) return res.writeHead(404).end(`Task with id ${id} not found`)

      const newTaskValues = {
        ...foundTask,
        title,
        description,
        updated_at: new Date(),
      }

      db.put(targetTable, id, newTaskValues)

      return res.writeHead(201).end()
    }
  },
  {
    url: getQueryParams('/tasks/:id'),
    method: 'DELETE',
    handler: (req, res) => {
      const { id } = req.params

      const taskToDelete = db.selectById(targetTable, id)

      if (!taskToDelete) {
        return res.writeHead(404).end(`Task with id ${id} not found`)
      }

      db.delete(targetTable, taskToDelete.id)

      return res.end()
    }
  },
  {
    url: getQueryParams('/tasks/:id/complete'),
    method: 'PATCH',
    handler: (req, res) => {
      const { id } = req.params

      const foundTask = db.selectById(targetTable, id)

      if (!foundTask) {
        return res.writeHead(404).end(`Task with id ${id} not found`)
      }

      const data = {
        completed_at: foundTask.completed_at ? null : new Date()
      }

      db.updateTaskCompletion(id, data)

      return res.end(id)
    }
  }
]
