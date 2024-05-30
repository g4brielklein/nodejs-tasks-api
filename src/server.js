import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middlewares/json.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  req.body = await json(req, res)

  const route = routes.find(route => route.method === method && route.url.test(url))
  
  const routeParams = url.match(route.url)
  const { ...params } = routeParams.groups || {}
  req.params = params 

  if (!route) return res.writeHead(404).end()
    
  return route.handler(req, res)
})

const PORT = 3334
server.listen(PORT, () => {
  console.log("Server's running")
})
