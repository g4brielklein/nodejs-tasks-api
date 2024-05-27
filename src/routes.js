import { randomUUID } from 'node:crypto'

const tasks = []

export const routes = [
  {
    url: '/tasks',
    method: 'GET',
    handler: (req, res) => {
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

      tasks.push(task)

      return res.writeHead(201).end()
    }
  }
]
