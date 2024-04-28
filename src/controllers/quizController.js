import * as quizServices from '../services/quizServices.js'
import path from 'path'

export let handleGetQuiz = async (req, res) => {
  try {
    let quizId = req.params.id // all or id
    if (!quizId) {
      return res.status(401).json({
        errorCode: 1,
        message: 'Missing required parameter!',
        quiz: []
      })
    }
    let quiz = await quizServices.getQuizById(quizId)
    return res.status(201).json({
      errorCode: 0,
      message: 'Get quiz done!',
      quiz
    })
  } catch (error) {
    return res.status(501).json({
      errorCode: 1,
      message: 'Get all user fail, please try again!',
      error: error
    })
  }
}

export let handleGetAllQuiz = async (req, res) => {
  try {
    let quiz = await quizServices.getAllQuizServices()
    return res.status(201).json({
      errorCode: 0,
      message: 'Get quiz done!',
      quiz
    })
  } catch (error) {
    return res.status(501).json({
      errorCode: 1,
      message: 'Get quiz fail, please try again!',
      error: error
    })
  }
}

export let handleGetSearchQuiz = async (req, res) => {
  try {
    let kind = 'search'
    let text = ''
    if (req.params.topic) {
      kind = 'topic'
      text = req.params.topic
    }
    if (req.params.quizName) {
      kind = 'search'
      text = req.params.quizName
    }
    let quiz = await quizServices.getSearchQuizServices(kind, text)
    return res.status(201).json({
      errorCode: 0,
      message: 'Get quiz done!',
      quiz
    })
  } catch (error) {
    return res.status(501).json({
      errorCode: 1,
      message: 'Get quiz fail, please try again!',
      error: error
    })
  }
}

export let handleGetActivityQuiz = async (req, res) => {
  try {
    let nav = req.params.nav
    let userId = req.params.userId
    let quiz = await quizServices.getAllQuizActivityServices(nav, userId)
    return res.status(201).json({
      errorCode: 0,
      message: 'Get quiz done!',
      quiz
    })
  } catch (error) {
    return res.status(501).json({
      errorCode: 1,
      message: 'Get quiz fail, please try again!',
      error: error
    })
  }
}

export let handleGetAllTopicQuiz = async (req, res) => {
  try {
    let topic = await quizServices.getAllTopicServices()
    return res.status(201).json({
      errorCode: 0,
      message: 'Get topic done!',
      topic
    })
  } catch (error) {
    return res.status(501).json({
      errorCode: 1,
      message: 'Get topic fail, please try again!',
      error: error
    })
  }
}

export let handleCreateQuiz = async (req, res) => {
  try {
    let userId = req.body.userId
    let topic = req.body.topic
    let numQuess = req.body.numQuess
    let quizData = req.body.quizData
    let quessArr = req.body.quessArr
    let scoreArr = req.body.scoreArr
    await quizServices.createQuizServices(
      userId,
      topic,
      numQuess,
      quizData,
      quessArr,
      scoreArr
    )

    return res.status(201).json({
      errorCode: 0,
      message: 'Create quiz done!'
    })
  } catch (error) {
    console.log(error)
    return res.status(501).json({
      errorCode: 1,
      message: 'Create quiz fail, please try again!',
      error: error
    })
  }
}
export let handleCreateQuizUpload = async (req, res) => {
  try {
    return res.status(201).json({
      errorCode: 0,
      message: 'Upload done!'
    })
  } catch (error) {
    console.log(error)
    return res.status(501).json({
      errorCode: 1,
      message: 'Upload fail, please try again!',
      error: error
    })
  }
}

export let handleUpdateQuiz = async (req, res) => {}
