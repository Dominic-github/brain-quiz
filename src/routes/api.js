import express from 'express'
import path from 'path'
import multer from 'multer'
import xssEscape from 'xss-escape'

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('src/public/assets/images/quiz/'))
  },
  filename: function (req, file, cb) {
    let originalname = xssEscape(file.originalname)
    cb(null, originalname)
  }
})

const upload = multer({
  storage: storage
})

import * as userController from '../controllers/userController.js'
import * as quizController from '../controllers/quizController.js'
import * as quessController from '../controllers/quessController.js'
import * as answerController from '../controllers/answerController.js'
import * as takeController from '../controllers/takeController.js'

let router = express.Router()

export let initApiRoutes = (app) => {
  // user
  router.get('/user/:id', userController.handleGetUser)
  router.get('/get-all-user', userController.handleGetAllUsers)
  router.post('/login', userController.handleLogin)
  router.post('/create-user', userController.handleCreateUser)
  router.post(
    '/user/update/:userId/:type/:value',
    userController.handleUpdateUser
  )
  router.post('/user/delete/:userId', userController.handleDeleteUser)

  //quiz
  router.get('/quiz/:id', quizController.handleGetQuiz)
  router.get('/get-all-quiz/', quizController.handleGetAllQuiz)

  router.post(
    '/create-quiz/upload/',
    upload.single('imageQuiz'),
    quizController.handleCreateQuizUpload
  )
  router.post('/create-quiz', quizController.handleCreateQuiz)

  // quess from quiz
  router.get('/quiz/:id/quess/', quessController.handleGetQuessByQuiz)

  // ans from quess form quiz
  router.get(
    '/quiz/:id/quess/:quessId/',
    answerController.handleGetAnswerByQuizByQuess
  )

  // ans form quiz
  router.get(
    '/quiz/:id/:difficult/answer',
    answerController.handleGetAnswerByQuiz
  )

  // quess
  router.get('/quess/:id', quessController.handleGetQuess)
  router.get('/get-all-quess/', quessController.handleGetAllQuess)

  // answer
  router.get('/answer/:id', answerController.handleGetAnswer)
  router.get('/get-all-answer/', answerController.handleGetAllAnswer)

  // ranking
  router.get('/quiz/:id/:difficult/take', takeController.handleGetTake)
  router.post(
    '/user/:userId/quiz/:quizId/:difficult/take',
    takeController.handleCreateTake
  )

  // search
  router.get('/search/topic/:topic', quizController.handleGetSearchQuiz)
  router.get('/search/q/:quizName', quizController.handleGetSearchQuiz)

  // activity
  router.get('/activity/:nav/:userId', quizController.handleGetActivityQuiz)

  // topic
  router.get('/get-all-topic', quizController.handleGetAllTopicQuiz)

  return app.use('/api', router)
}
