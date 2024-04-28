import * as answerServices from '../services/answerServices.js'
import path from 'path'

export let handleGetAnswer = async (req, res) => {
  let answerId = req.params.id // all or id
  if (!answerId) {
    return res.status(401).json({
      errorCode: 1,
      message: 'Missing required parameter!',
      answer: []
    })
  }
  let answer = await answerServices.getQuessById(answerId)
  return res.status(201).json({
    errorCode: 0,
    message: 'Get answer done!',
    answer
  })
}

export let handleGetAnswerByQuiz = async (req, res) => {
  let quizId = req.params.id // all or id
  let difficult = req.params.difficult // all or id

  if (!quizId) {
    return res.status(401).json({
      errorCode: 1,
      message: 'Missing required parameter!',
      answer: []
    })
  }
  let answer = await answerServices.getAllAnswerByQuizServices(
    difficult,
    quizId
  )
  return res.status(201).json({
    errorCode: 0,
    message: 'Get answer done!',
    answer
  })
}

export let handleGetAnswerByQuizByQuess = async (req, res) => {
  let quizId = req.params.id // all or id
  let quessId = req.params.quessId // all or id
  if (!quizId || !quessId) {
    return res.status(401).json({
      errorCode: 1,
      message: 'Missing required parameter!',
      answer: []
    })
  }
  let answer = await answerServices.getAllAnswerByQuizByQuessServices(
    quizId,
    quessId
  )
  return res.status(201).json({
    errorCode: 0,
    message: 'Get answer done!',
    answer
  })
}

export let handleGetAllAnswer = async (req, res) => {
  let answer = await answerServices.getAllAnswerServices()
  return res.status(201).json({
    errorCode: 0,
    message: 'Get answer done!',
    answer
  })
}
