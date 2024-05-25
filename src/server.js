import http from 'node:http'
import { routes } from './routes.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  const route = routes.find(route => route.method === method && route.url === url)

  if (!route) return res.writeHead(404).end()
    
  return route.handler(req, res)
})

const PORT = 3334
server.listen(PORT, () => {
  console.log("Server's running")
})
