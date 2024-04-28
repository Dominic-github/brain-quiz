import express from 'express'
import * as pageController from '../controllers/pageController.js'

// import middlewareController from '../middleware/middlewareController'

let router = express.Router()

export let initWebRoutes = (app) => {
  router.get('/', pageController.handleGetHomePage)
  router.get('/home', pageController.handleGetHomePage)
  router.get('/error', pageController.handleGetErrorPage)
  router.get('/login', pageController.handleGetLoginPage)
  router.get('/logout', pageController.handleGetLogoutPage)

  // admin
  router.get('/admin/dashboard', pageController.handleGetDashBoardPage)

  // User
  router.get('/user/info', pageController.handleGetHomePage)
  router.get('/user/setting', pageController.handleGetSettingPage)
  router.get('/activity', pageController.handleGetActivityPage)

  // quiz
  router.get('/quiz/:id', pageController.handleGetQuizPage)
  router.get('/quiz/:id/:difficult', pageController.handleGetQuessPage)

  // activity
  router.get('/activity/:nav', pageController.handleGetActivityPage)

  // search/topic
  router.get('/search/topic/:topic', pageController.handleGetSearchPage)

  // search
  router.get('/search/:quizname', pageController.handleGetSearchPage)
  router.get('/search/', pageController.handleGetSearchPage)

  // create quiz
  router.get('/createquiz', pageController.handleGetCreateQuizPage)

  // create quess
  router.get(
    '/createquess/:topic/:number',
    pageController.handleGetCreateQuessPage
  )

  return app.use('/', router)
}
