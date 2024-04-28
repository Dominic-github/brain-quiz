import * as takeServices from '../services/takeServices.js'

export let handleGetTake = async (req, res) => {
  try {
    let quizId = req.params.id
    let difficult = req.params.difficult
    let take = await takeServices.getTakeServices(quizId, difficult)
    return res.status(201).json({
      errorCode: 0,
      message: 'Get ranking done!',
      take
    })
  } catch (error) {
    res.status(501).json({ errorCode: 1, message: error })
  }
}

export let handleCreateTake = async (req, res) => {
  try {
    let userId = req.params.userId
    let quizId = req.params.quizId
    let difficult = req.params.difficult
    let answerArr = req.body.answerArr
    let userScore = req.body.userScore
    let quessIdArr = req.body.quessIdArr
    let contentArr = req.body.contentArr

    await takeServices.createTakeServices(
      userId,
      quizId,
      difficult,
      userScore,
      answerArr,
      quessIdArr
    )
    return res.status(201).json({
      errorCode: 0,
      message: 'Create rank done!'
    })
  } catch (error) {
    res.status(501).json({ errorCode: 1, message: error })
  }
}
