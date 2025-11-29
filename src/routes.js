import { randomUUID } from "crypto"
import { Database } from "./database.js"
import { buildRoutePath } from "../utils/build-route-path.js"

const database = new Database
const dataAtual = new Date()


export const routes = [
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {

            const { title, description } = req.body

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: dataAtual,
                updated_at: null
            }

            database.insert('tasks', task)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query

            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            } : null)

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            const task = database.selectById('tasks', id)

            if (!task) {
                return res.writeHead(404).end(JSON.stringify({ message: "Task not found" }))
            }

            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body

            const task = database.selectById('tasks', id)

            if(!task){
                return res.writeHead(404).end(JSON.stringify({ message: "Task not found" }))
            }

            database.put('tasks', id, {
                title,
                description,
                updated_at: dataAtual
            })

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params

            const task = database.selectById('tasks', id)

            if (!task) {
                return res.writeHead(404).end(JSON.stringify({ message: 'Task not found' }))
            }

            database.patch('tasks', id, {
                completed_at: dataAtual,
                updated_at: dataAtual
            })

            res.writeHead(204).end()
        }
    }
]