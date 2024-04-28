import { connection } from '../configs/database.js'
import bcrypt from 'bcryptjs'

export let getQuessById = async (quessId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT * FROM quiz_answer Where id = '${quessId}' `
      const [results, fields] = await connection.query(sql)
      if (results[0]) {
        resolve(results[0])
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let getAllAnswerByQuizServices = async (difficult, quizId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT quiz_answer.id , quiz_answer.questionId, 
        quiz_question.title, quiz_question.type, 
        quiz_question.score as quessScore,  quiz_answer.content,
        quiz.score as quizScore,
        quiz_question.difficult, 
        quiz_answer.correct FROM quiz_answer 
        join quiz ON quiz_answer.quizId = quiz.id
        join quiz_question ON quiz_answer.questionId = quiz_question.id 
        where quiz_answer.quizId = ${quizId} and quiz_question.difficult = '${difficult}'
      `
      const [results, fields] = await connection.query(sql)
      if (results) {
        resolve(results)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let getAllAnswerByQuizByQuessServices = async (quizId, quessId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT * FROM quiz_answer Where quizId = '${quizId}' and  questionId = '${quessId}' `
      const [results, fields] = await connection.query(sql)
      if (results) {
        resolve(results)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let getAllAnswerServices = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT * FROM quiz_answer`
      const [results, fields] = await connection.query(sql)
      if (results) {
        resolve(results)
      }
    } catch (error) {
      reject(error)
    }
  })
}
