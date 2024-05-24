import http from 'node:http'
import { randomUUID } from 'node:crypto'

const tasks = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/tasks') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(tasks))
  }

  if (method === 'POST' && url === '/tasks') {
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

  return res.writeHead(404).end()
})

const PORT = 3334
server.listen(PORT, () => {
  console.log("Server's running")
})
