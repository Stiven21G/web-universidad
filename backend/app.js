import express, { json } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'
import { randomUUID } from 'crypto'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '12345',
  port: 3306,
  database: 'proyectos'
}

// const config = process.env.DATABASE_URL ?? DEFAULT_CONFIG
const connection = await mysql.createConnection(DEFAULT_CONFIG)

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const selectFile = (ruta) => {
  // Nombre del archivo
  const fileName = fileURLToPath(import.meta.url)
  // Ruta del directorio
  const dirName = path.dirname(fileName)

  // MiddleWare
  const publicPath = path.resolve(dirName, ruta)
  app.use(express.static(publicPath))
  return publicPath
}

app.get('/login', (req, res) => {
  const file = selectFile('../login')
  res.sendFile(path.join(file, 'login.html'))
})

app.get('/register', (req, res) => {
  const file = selectFile('../register')
  res.sendFile(path.join(file, 'register.html'))
})

app.get('/', async (req, res) => {
  const [user] = await connection.query(
    'SELECT nombres,apellidos,correo,password, BIN_TO_UUID(id) id FROM estudiantes '
  )
 res.json(user)
})
// app.post('/register', async (req, res) => {
//   const { name, lastName, email, password } = req.body

//   const [uuidResult] = await connection.query('SELECT UUID() uuid;')
//   const [{ uuid }] = uuidResult

//   try {
//     await connection.query(
//         `INSERT INTO estudiantes (id,nombres,apellidos,correo,password) values
//         (UUID_TO_BIN("${uuid}"),?,?,?,?);`, [name,lastName, email, password]
//     )
//   } catch (e) {
//     console.log(e)
//   }
// })

app.post('/register', async (req, res) => {
  const { name, lastName, email, password } = req.body

  if (!name || !lastName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    // Generate UUID
    const [uuidResult] = await connection.query('SELECT UUID() as uuid;')
    const [{ uuid }] = uuidResult

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert into database
    await connection.query(
      `INSERT INTO estudiantes (id, nombres, apellidos, correo, password) 
       VALUES (UUID_TO_BIN(?), ?, ?, ?, ?);`,
      [uuid, name, lastName, email, hashedPassword]
    )

    res.status(201).json({ message: 'User registered successfully' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  console.log(`server listenin on port http://localhost:${PORT}`)
})
