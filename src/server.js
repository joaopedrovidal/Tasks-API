import http from 'http'
import { routes } from './routes.js'
import { json } from '../middleweres/json.js'
import { queryParams } from '../utils/query-params.js'

const server = http.createServer(async(req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route){
        const routeParams = req.url.match(route.path)

        const { query, ...params } = routeParams.groups
    
        req.params = params
        req.query = query ? queryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end('Not Found')
})

server.listen(3333)