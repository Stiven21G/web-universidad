import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import
import mysql from 'mysql2'

const config = {
  host: 'localhost',
  user: 'root',
  password: '12345',
  port: 3306,
  database: 'proyectos'
}

const app = express()
const PORT = process.env.PORT ?? 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const selectFile = (ruta) => {
// Ruta del directorio
  const dirName = path.dirname(fileName)

  // MiddleWare
  const publicPath = path.resolve(dirName, ruta)
  app.use(express.static(publicPath))
  return publicPath
}
// Nombre del archivo
const fileName = fileURLToPath(import.meta.url)

app.get('/login', (req, res) => {
  const file = selectFile('../login')
  res.sendFile(path.join(file, 'login.html'))
})

app.get('/', (req, res) => {
  const file = selectFile('../register')
  res.sendFile(path.join(file, 'register.html'))
})

app.post('/register', (req, res) => {
  const { names, lastName, email, pass } = req.body

})

app.listen(PORT, () => {
  console.log(`server listenin on port http://localhost:${PORT}`)
})
