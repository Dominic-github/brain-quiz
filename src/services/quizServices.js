import { connection } from '../configs/database.js'
import bcrypt from 'bcryptjs'

export let getQuizById = async (quizId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT * FROM quiz Where id = '${quizId}' `
      const [results, fields] = await connection.query(sql)
      if (results[0]) {
        resolve(results[0])
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let getAllQuizServices = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let sql = `SELECT * FROM quiz `
      const [results, fields] = await connection.query(sql)
      if (results) {
        resolve(results)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let getSearchQuizServices = async (kind, text) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sql
      if (kind == 'topic') {
        sql = `SELECT * FROM quiz where topic = '${text}'`
      }
      if (kind == 'search') {
        if (text != '') {
          sql = `SELECT * FROM quiz where title LIKE '%${text}%'`
        } else {
          sql = `SELECT * FROM quiz`
        }
      }
      const [results, fields] = await connection.query(sql)
      if (results) {
        resolve(results)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let getRankingServices = async (quizId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT * FROM ranking where quizid = ${quizId}`
      const [results, fields] = await connection.query(sql)
      if (results) {
        resolve(results)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let getAllQuizActivityServices = async (nav, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sql = 'SELECT * FROM quiz'
      if (nav == 'completed') {
        sql = `SELECT * FROM take JOIN quiz on take.quizId = quiz.id where take.userId = ${userId} AND status = 1`
      }
      if (nav == 'created') {
        sql = `SELECT * FROM quiz where userId = ${userId}`
      }
      const [results, fields] = await connection.query(sql)
      if (results) {
        resolve(results)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let getAllTopicServices = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let sql = 'SELECT * FROM quiz_topic'
      const [results, fields] = await connection.query(sql)
      if (results) {
        resolve(results)
      }
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
export let createQuizServices = async (
  userId,
  topic,
  numQuess,
  quizData,
  quessArr,
  scoreArr
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sumScore = 0
      for (let i = 0; i < scoreArr.length; i++) {
        sumScore += Number(scoreArr[i])
      }

      let createQuizSql = `INSERT INTO quiz (userId, title, topic, image, subTitle, length, played, score) 
      VALUES
      (${userId}, '${quizData[0]}', '${topic}', '${quizData[1]}', '${quizData[2]}', ${numQuess}, 0, ${sumScore})
      `
      await connection.query(createQuizSql)

      let getMaxQuizSql = 'SELECT MAX(id) as maxId FROM quiz'
      let [resultsGetMaxQuiz, fieldsGetMaxQuiz] = await connection.query(
        getMaxQuizSql
      )
      let quizId = resultsGetMaxQuiz[0].maxId

      for (const [key, element] of quessArr.entries()) {
        let createQuessSql = `INSERT INTO quiz_question (quizId, title , difficult, type, score)
        VALUES
        (${quizId}, '${element.title}', '${element.difficult}', '${element.type}', '${scoreArr[key]}')
        `
        await connection.query(createQuessSql)
        let getMaxQuessSql = 'SELECT MAX(id) as maxId FROM quiz_question'
        let [resultsGetMaxQuessSql, fieldsGetMaxQuessSql] =
          await connection.query(getMaxQuessSql)
        let quessIdIndex = resultsGetMaxQuessSql[0].maxId

        if (element.type === 'singlechoice') {
          for (let key = 0; key < element.answerQuess.length; key++) {
            const answer = element.answerQuess[key]
            if (key + 1 === Number(element.answer[0])) {
              let createQuessAnswerSql = `INSERT INTO quiz_answer (quizId, questionId, content, correct)
                                    VALUES
                                    (${quizId}, ${quessIdIndex}, '${answer}', 1)
                                    `
              await connection.query(createQuessAnswerSql)
            } else {
              let createQuessAnswerSql = `INSERT INTO quiz_answer (quizId, questionId, content, correct)
                                    VALUES
                                    (${quizId}, ${quessIdIndex}, '${answer}', 0)
                                    `
              await connection.query(createQuessAnswerSql)
            }
          }
        } else if (element.type === 'multichoice') {
          for (let key = 0; key < element.answerQuess.length; key++) {
            const answer = element.answerQuess[key]
            if (key + 1 === Number(element.answer[key])) {
              let createQuessAnswerSql = `INSERT INTO quiz_answer (quizId, questionId, content, correct)
                                    VALUES
                                    (${quizId}, ${quessIdIndex}, '${answer}', 1)
                                    `
              await connection.query(createQuessAnswerSql)
            } else {
              let createQuessAnswerSql = `INSERT INTO quiz_answer (quizId, questionId, content, correct)
                                    VALUES
                                    (${quizId}, ${quessIdIndex}, '${answer}', 0)
                                    `
              await connection.query(createQuessAnswerSql)
            }
          }
        } else if (element.type === 'true-false') {
          if (element.answer[0] === true) {
            let createQuessAnswerSql = `INSERT INTO quiz_answer (quizId, questionId, content ,correct)
                                    VALUES
                                    (${quizId}, ${quessIdIndex}, 'True', 1 ),
                                    (${quizId}, ${quessIdIndex}, 'False', 0 )
                                    `
            await connection.query(createQuessAnswerSql)
          } else {
            let createQuessAnswerSql = `INSERT INTO quiz_answer (quizId, questionId, content ,correct)
                                    VALUES
                                    (${quizId}, ${quessIdIndex}, 'True', 0 ),
                                    (${quizId}, ${quessIdIndex}, 'False', 1 )
                                    `
            await connection.query(createQuessAnswerSql)
          }
        } else if (element.type === 'input') {
          let createQuessAnswerSql = `INSERT INTO quiz_answer (quizId, questionId, content ,correct)
                                VALUES
                                (${quizId}, ${quessIdIndex}, '${element.answer[0]}', 1)
                                `
          await connection.query(createQuessAnswerSql)
        }
      }
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
