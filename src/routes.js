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

      const task = {
        id: randomUUID(),
        title,
        description,
      }

      db.create(targetTable, task)

      return res.writeHead(201).end()
    }
  }
]
