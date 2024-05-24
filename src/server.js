import http from 'node:http'

const tasks = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/tasks') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(tasks))
  }

  return res.writeHead(404).end()
})

const PORT = 3334
server.listen(PORT, () => {
  console.log("Server's running")
})
 