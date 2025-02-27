import dotenv from 'dotenv'
import mysql from 'mysql2'
dotenv.config()

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

//((`rol` IN ('RR.PP', 'admin', 'usuario')))
// module.exports = pool;