import { randomUUID } from 'node:crypto'

const tasks = []

export const routes = [
  {
    url: '/tasks',
    method: 'GET',
    handler: (req, res) => {
      return res
      .setHeader('Content-type', 'application/json')
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

      tasks.push(task)

      return res.writeHead(201).end()
    }
  }
]
