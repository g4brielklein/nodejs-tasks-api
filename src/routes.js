import { randomUUID } from 'node:crypto'
import { database } from './database.js'

const db = new database()
const targetTable = 'tasks'

export const routes = [
  {
    url: '/tasks',
    method: 'GET',
    handler: (req, res) => {
      const tasks = db.select(targetTable)

      return res
      .end(JSON.stringify(tasks))
    }
  },
  {
    url: '/tasks',
    method: 'POST',
    handler: async (req, res) => {
      const { title, description } = req.body
      const created_at = new Date()

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
  }
]
