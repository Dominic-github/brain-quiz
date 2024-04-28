import * as userServices from '../services/userServices.js'
import cookie from 'cookie'
import path from 'path'

export let handleLogin = async (req, res) => {
  try {
    let { email, password } = req.body
    let dataUser = await userServices.handleUserLoginServices(email, password)
    if (dataUser.errorCode !== 0) {
      res.cookie('data', JSON.stringify(dataUser))
      res.redirect('/')
    } else {
      res.cookie('user', JSON.stringify(dataUser.user))
      res.redirect('/home')
    }
  } catch (error) {
    res.status(501).json({
      errorCode: 1,
      message: 'Login fail, please try again!',
      error: error
    })
  }
}

export let handleCreateUser = async (req, res) => {
  try {
    let dataUser = await userServices.handleCreateUserServices(req.body)
    if (dataUser.errorCode !== 0) {
      res.cookie('data', JSON.stringify(dataUser))
      res.redirect('/')
    } else {
      res.cookie('user', JSON.stringify(dataUser.user))
      res.redirect('/home')
    }
  } catch (error) {
    res.status(501).json({
      errorCode: 1,
      message: 'Create user fail, please try again!',
      error: error
    })
  }
}

export let handleGetUser = async (req, res) => {
  try {
    let userId = req.params.id // all or id
    if (!userId) {
      return res.status(401).json({
        errorCode: 1,
        message: 'Missing required parameter!',
        users: []
      })
    }
    let users = await userServices.getUserById(userId)
    return res.status(201).json({
      errorCode: 0,
      message: 'Get user done!',
      users
    })
  } catch (error) {
    res.status(501).json({
      errorCode: 1,
      message: 'Get user fail, please try again!',
      error: error
    })
  }
}

export let handleGetAllUsers = async (req, res) => {
  try {
    let users = await userServices.getAllUserServices()
    return res.status(201).json({
      errorCode: 0,
      message: 'Get user done!',
      users
    })
  } catch (error) {
    res.status(501).json({
      errorCode: 1,
      message: 'Get all user fail, please try again!',
      error: error
    })
  }
}

export let handleUpdateUser = async (req, res) => {
  try {
    let type = req.params.type
    let value = req.params.value
    let userId = req.params.userId
    let dataUser = await userServices.handleUpdateUserServices(
      userId,
      type,
      value
    )
    res.cookie('user', JSON.stringify(dataUser.user))

    return res.status(201).json({
      errorCode: 0,
      message: 'Update user done!'
    })
  } catch (error) {
    console.log(error)
    return res.status(501).json({
      errorCode: 1,
      message: 'Update user fail, please try again!',
      error: error
    })
  }
}

export let handleDeleteUser = async (req, res) => {
  try {
    let userId = req.params.userId
    await userServices.handleDeleteUserServices(userId)
    return res.status(201).json({
      errorCode: 0,
      message: 'Delete user done!'
    })
  } catch (error) {
    return res.status(501).json({
      errorCode: 1,
      message: 'Delete user fail, please try again!',
      error: error
    })
  }
}
