import { connection } from '../configs/database.js'
import _ from 'lodash'

export let getTakeServices = async (quizId, difficult) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT take.userId, take.quizId , take_answer.questionId,
              take.difficult, take_score, take.status,
              user.fullName, user.email, user.phone, 
              active,
              startedAt,finishedAt
              FROM take 
              JOIN user on take.userId = user.id
              JOIN quiz on take.quizId = quiz.id
              JOIN take_answer on take.id = take_answer.takeId 
              where take.quizId = ${quizId} and take.difficult = '${difficult}' and take.status = '1'
              `
      const [results, fields] = await connection.query(sql)
      if (results) {
        // Use of _.sortBy() method
        let results_sort = _.orderBy(
          results,
          ['take_score', 'userId'],
          ['desc', 'asc']
        )

        resolve(results_sort)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let getRankingQuizServices = async (quizId, difficult) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT * FROM take 
              JOIN user on take.userId = user.id
              JOIN quiz on take.quizId = quiz.id
              JOIN take_answer on take.id = take_answer.takeId 
              where take.quizId = ${quizId} and take.difficult = '${difficult}'
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

export let createTakeServices = async (
  userId,
  quizId,
  difficult,
  userScore,
  answerArr,
  quessIdArr
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkTake = `Select * from take where userId = ${userId} AND quizId = ${quizId} AND difficult = '${difficult}' `
      let [resultsCheckTake, fieldsCheckTake] = await connection.query(
        checkTake
      )
      if (resultsCheckTake[0]) {
        let takeId = resultsCheckTake[0].id
        let updateTake = `Update take SET  status = 0 WHERE id = ${takeId}  AND difficult = '${difficult}' `
        await connection.query(updateTake)
      }

      let takeSql = ` INSERT INTO take (userId, quizId, status, difficult, take_score) 
      VALUES 
      (${userId}, ${quizId}, 1, '${difficult}', ${userScore})
      `

      await connection.query(takeSql)

      let getTakeSql = 'SELECT MAX(id) as maxId FROM take'
      let [resultsGetTake, fieldsGetTake] = await connection.query(getTakeSql)
      let takeId = resultsGetTake[0].maxId
      let index = 0
      answerArr.forEach(async (element) => {
        let takeAnswerSql = `INSERT INTO take_answer (takeId, quizId, questionId, active) VALUES (${takeId}, ${quizId} , ${quessIdArr[index]}, ${element}) `
        await connection.query(takeAnswerSql)
        index++
      })
      let getPlayed = `SELECT  * FROM quiz where id = ${quizId}`
      let [resultsGetPlayed, fieldsGetPlayed] = await connection.query(
        getPlayed
      )
      let played = resultsGetPlayed[0].played + 1
      let updatePlayedSql = `Update quiz set played = ${played} where id = ${quizId} `
      await connection.query(updatePlayedSql)

      resolve({
        errorCode: 0,
        message: 'Take created successfully.'
      })
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
