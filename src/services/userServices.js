import { connection } from '../configs/database.js'
import bcrypt from 'bcryptjs'

export let handleUserLoginServices = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {}
      let isExist = await checkUserEmail(email)
      let sql = `SELECT * FROM user Where email = '${email}' `
      let [results, fields] = await connection.query(sql)
      if (isExist && results[0]) {
        let checkPassword = await bcrypt.compareSync(
          password,
          results[0].password
        )
        if (checkPassword) {
          userData.errorCode = 0
          userData.message = 'Login is success'
          userData.user = results[0]
          delete results[0].password
          await updateLogined(email)
          resolve({ ...userData })
        } else {
          userData.errorCode = 1
          userData.message = 'User is not found'
          resolve({ ...userData })
        }
      } else {
        userData.errorCode = 1
        userData.message = "Your email isn't Exist, Try again"
        resolve({ ...userData })
      }
    } catch (error) {
      reject(error)
    }
  })
}

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let salt = 10
      let hashPassword = await bcrypt.hashSync(password, salt)
      resolve(hashPassword)
    } catch (err) {
      reject(err)
    }
  })
}

let checkUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmail = `SELECT * FROM user Where email = '${email}'`
      let [result, fields] = await connection.query(checkEmail)
      if (result[0]) {
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (error) {
      reject(error)
    }
  })
}

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmail = `SELECT * FROM user Where email = '${email}'`
      let [result, fields] = await connection.query(checkEmail)
      if (result[0]) {
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (error) {
      reject(error)
    }
  })
}
let updateLogined = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmail = `UPDATE user SET lastLogin = NOW() Where email = '${email}' `
      let [result, fields] = await connection.query(checkEmail)
      if (result[0]) {
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let getUserById = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT * FROM user Where id = '${userId}' `
      const [results, fields] = await connection.query(sql)
      if (results[0]) {
        delete results[0].password
        resolve(results[0])
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let getAllUserServices = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT * FROM user `
      const [results, fields] = await connection.query(sql)

      if (results) {
        results.map((user, key) => {
          delete user.password
        })
        resolve(results)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let handleCreateUserServices = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check user email is exist??
      let checkEmail = await checkUserEmail(data.email)
      if (checkEmail) {
        resolve({
          errorCode: 1,
          message: 'Your email is Exist, Try again'
        })
      } else {
        if (!data.name || !data.email || !data.password) {
          resolve({
            errorCode: 1,
            message: 'Fill in the information.'
          })
        } else {
          let host = 0
          let password = await hashUserPassword(data.password)
          let sql = `INSERT INTO user(fullName, email, password, host ) VALUES ( '${data.name}', '${data.email}',  '${password}', '${host}'  )`
          await connection.query(sql)
          let checkuser = `SELECT * FROM user Where email = '${data.email}' AND fullName='${data.name}' `
          let [results, fields] = await connection.query(checkuser)
          if (results[0]) {
            await updateLogined(data.email)
            delete results[0].password
            resolve({
              errorCode: 0,
              message: 'User created successfully.',
              user: results[0]
            })
          } else {
            resolve({
              errorCode: 1,
              message: 'Create user failed!'
            })
          }
        }
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let handleUpdateUserServices = async (userId, type, value) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errorCode: 1,
          message: 'User ID not found, or user has been deleted'
        })
      } else if (!type || !value) {
        resolve({
          errorCode: 1,
          message: 'Missing Parameter!'
        })
      } else {
        if (type == 'password') {
          value = await hashUserPassword(value)
        }
        let sql = `Update user SET ${type} = '${value}' Where id = '${userId}' `
        let [results, fields] = await connection.query(sql)

        let getUserSql = `SELECT * FROM user Where id = '${userId}' `
        let [resultsGetUser, fieldsGetUser] = await connection.query(getUserSql)

        if (resultsGetUser[0]) {
          delete resultsGetUser[0].password
          resolve({
            errorCode: 0,
            message: 'Update User success!',
            user: resultsGetUser[0]
          })
        } else {
          resolve({
            errorCode: 1,
            message: 'No user found in the system'
          })
        }
      }
    } catch (error) {
      reject(error)
    }
  })
}

export let handleDeleteUserServices = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errorCode: 1,
          message: 'User ID not found, or user has been deleted'
        })
      } else {
        let getTakeId = `Select id from take where userId = ${userId}`
        let [resultsGetTakeId, fieldsGetTakeId] = await connection.query(
          getTakeId
        )
        let getQuizId = `Select id from quiz where userId = ${userId}`
        let [resultsGetQuizId, fieldsGetQuizId] = await connection.query(
          getQuizId
        )
        console.log(resultsGetQuizId.length)
        let index = 0
        await resultsGetQuizId.forEach(async (element) => {
          let removeTakeAnswer = `DELETE FROM take_answer Where quizId = ${element.id} `
          await connection.query(removeTakeAnswer)

          let removeQuizAnswer = `DELETE FROM quiz_answer Where quizId = ${element.id} `
          await connection.query(removeQuizAnswer)

          let removeQuizQuesstion = `DELETE FROM quiz_question Where quizId = ${element.id} `
          await connection.query(removeQuizQuesstion)

          let removeTake = `DELETE FROM take Where quizId = ${element.id} `
          await connection.query(removeTake)

          if (index == resultsGetQuizId.length - 1) {
            let deleteTake = `DELETE FROM take Where userId = ${userId} `
            await connection.query(deleteTake)

            let deleteQuiz = `DELETE FROM quiz Where userId = ${userId} `
            await connection.query(deleteQuiz)

            let sql = `DELETE FROM user Where id = ${userId} `
            await connection.query(sql)
          }
          console.log(index)
          index++
        })

        resolve({
          errorCode: 0,
          message: 'Delete user done!'
        })
      }
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
