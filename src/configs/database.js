// Get the client
import mysql from 'mysql2/promise'
import 'dotenv/config'

// Create the connection to database
export const connection = await mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  timezone: process.env.MYSQL_TIME_ZONE
})
