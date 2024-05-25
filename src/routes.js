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
      const buffers = []
    
      for await (let chunk of req) {
        buffers.push(chunk)
      }
      
      req.body = JSON.parse(Buffer.concat(buffers))

      const task = {
        id: randomUUID(),
        title: req.body.title,
        description: req.body.description,
      }

      tasks.push(task)

      return res.writeHead(201).end()
    }
  }
]
