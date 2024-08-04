import express from 'express'

const app = express()

const PORT = process.env.PORT ?? 3000

app.get('/', (req, res) => {
  res.send('HOLA MUNDO ')
})

app.listen(PORT, () => {
  console.log(`listen on port http://localhost:${PORT}`)
})
