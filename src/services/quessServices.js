import { connection } from '../configs/database.js'
import bcrypt from 'bcryptjs'

export let getQuessById = async (quessId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT * FROM quiz_question Where id = '${quessId}' `
      const [results, fields] = await connection.query(sql)
      if (results[0]) {
        resolve(results[0])
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let getAllQuessByQuizId = async (quizId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT * FROM quiz_question Where quizId = '${quizId}' `
      const [results, fields] = await connection.query(sql)
      if (results) {
        resolve(results)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let getAllQuessServices = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT * FROM quiz_question`
      const [results, fields] = await connection.query(sql)
      if (results) {
        resolve(results)
      }
    } catch (error) {
      reject(error)
    }
  })
}
