import * as db from './routes.js'
import express from 'express'
const app = express()
const port = 3000

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/users', db.getUsers)
app.post('/users', db.createEmployee)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})