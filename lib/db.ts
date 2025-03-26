import mysql from "mysql2/promise"

export async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
}

export async function query(sql: string, params: any[] = []) {
  const connection = await getConnection()
  try {
    const [results] = await connection.execute(sql, params)
    return results
  } finally {
    await connection.end()
  }
}

