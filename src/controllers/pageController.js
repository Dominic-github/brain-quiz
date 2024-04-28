import path from 'path'
import * as pageServices from '../services/pageServices.js'

export let handleGetLoginPage = async (req, res) => {
  try {
    let action = 'loginPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/pages/index.html'))
  } catch (error) {
    console.log(error)
    let action = 'errorPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/pages/error.html'))
  }
}

export let handleGetDashBoardPage = async (req, res) => {
  try {
    let action = 'dashBoardPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/admin/dashboard.html'))
  } catch (error) {
    console.log(error)
    let action = 'errorPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/pages/error.html'))
  }
}

export let handleGetHomePage = async (req, res) => {
  try {
    let action = 'homePage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/client/home.html'))
  } catch (error) {
    console.log(error)
    let action = 'errorPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/pages/error.html'))
  }
}

export let handleGetActivityPage = async (req, res) => {
  try {
    let action = 'activityPage'
    // completed or created
    let nav = req.params.nav ? req.params.nav : 'completed'
    res.cookie('nav', JSON.stringify(nav))
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/client/activity.html'))
  } catch (error) {
    console.log(error)
    let action = 'errorPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/pages/error.html'))
  }
}

export let handleGetErrorPage = async (req, res) => {
  try {
    let action = 'errorPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/pages/error.html'))
  } catch (error) {
    console.log(error)
  }
}

export let handleGetLogoutPage = async (req, res) => {
  try {
    let action = 'logoutPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/pages/index.html'))
  } catch (error) {
    console.log(error)
    let action = 'errorPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/pages/error.html'))
  }
}

export let handleGetSettingPage = async (req, res) => {
  try {
    let action = 'settingPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/client/setting.html'))
  } catch (error) {
    console.log(error)
    let action = 'errorPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/pages/error.html'))
  }
}

export let handleGetQuizPage = async (req, res) => {
  try {
    let action = 'quizPage'
    res.cookie('action', JSON.stringify(action))
    res.cookie('quizId', JSON.stringify(req.params.id))
    res.sendFile(path.resolve('src/views/client/quiz.html'))
  } catch (error) {
    console.log(error)
    let action = 'errorPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/pages/error.html'))
  }
}

export let handleGetQuessPage = async (req, res) => {
  try {
    let action = 'quessPage'
    res.cookie('action', JSON.stringify(action))
    res.cookie('quizId', JSON.stringify(req.params.id))
    res.cookie('difficult', JSON.stringify(req.params.difficult))
    res.sendFile(path.resolve('src/views/client/quess.html'))
  } catch (error) {
    console.log(error)
    let action = 'errorPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/pages/error.html'))
  }
}

export let handleGetSearchPage = async (req, res) => {
  try {
    let action = 'searchPage'
    res.cookie('action', JSON.stringify(action))
    if (req.params.quizname) {
      res.cookie('search-quizname', JSON.stringify(req.params.quizname))
    } else if (req.params.topic) {
      res.cookie('search-topic', JSON.stringify(req.params.topic))
    }
    res.sendFile(path.resolve('src/views/client/search.html'))
  } catch (error) {
    console.log(error)
    let action = 'errorPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/pages/error.html'))
  }
}

export let handleGetCreateQuizPage = async (req, res) => {
  try {
    let action = 'createQuizPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/client/createQuiz.html'))
  } catch (error) {
    console.log(error)
    let action = 'errorPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/pages/error.html'))
  }
}
export let handleGetCreateQuessPage = async (req, res) => {
  try {
    let action = 'createQuessPage'
    let topic = req.params.topic
    let number = req.params.number
    res.cookie('topicCreateQuess', JSON.stringify(topic))
    res.cookie('numberCreateQuess', JSON.stringify(number))
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/client/createQuess.html'))
  } catch (error) {
    console.log(error)
    let action = 'errorPage'
    res.cookie('action', JSON.stringify(action))
    res.sendFile(path.resolve('src/views/pages/error.html'))
  }
}
