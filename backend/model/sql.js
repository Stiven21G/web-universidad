import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: '12345',
  port: 3306,
  database: 'proyectos'
}

const connection = await mysql.createConnection(config)

export class baseDatos {
  static async selectUser ({ input }) {
    const [user] = await connection.query(
      'SELECT nombres,apellidos,correo,password,BIN_TO_UUID(id) id FROM estudiantes'
    )
    return user
  }

  static async createUser ({ input }) {

  }
}
