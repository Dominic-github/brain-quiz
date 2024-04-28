import * as quessServices from '../services/quessServices.js'
import path from 'path'

export let handleGetQuess = async (req, res) => {
  try {
    let quessId = req.params.id // all or id
    if (!quessId) {
      return res.status(401).json({
        errorCode: 1,
        message: 'Missing required parameter!',
        quess: []
      })
    }
    let quess = await quessServices.getQuessById(quessId)
    return res.status(201).json({
      errorCode: 0,
      message: 'Get quess done!',
      quess
    })
  } catch (error) {
    return res.status(501).json({
      errorCode: 1,
      message: 'Get quess fail, please try again!',
      error: error
    })
  }
}

export let handleGetQuessByQuiz = async (req, res) => {
  try {
    let quizId = req.params.id // all or id
    if (!quizId) {
      return res.status(401).json({
        errorCode: 1,
        message: 'Missing required parameter!',
        quess: []
      })
    }
    let quess = await quessServices.getAllQuessByQuizId(quizId)
    return res.status(201).json({
      errorCode: 0,
      message: 'Get quess done!',
      quess
    })
  } catch (error) {
    return res.status(501).json({
      errorCode: 1,
      message: 'Get quess by quiz fail, please try again!',
      error: error
    })
  }
}

export let handleGetAllQuess = async (req, res) => {
  try {
    let quess = await quessServices.getAllQuessServices()
    return res.status(201).json({
      errorCode: 0,
      message: 'Get quess done!',
      quess
    })
  } catch (error) {
    return res.status(501).json({
      errorCode: 1,
      message: 'Get all quess fail, please try again!',
      error: error
    })
  }
}
