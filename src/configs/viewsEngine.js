import express from 'express'

export let configViewsEngine = (app) => {
  app.use(express.static('./src/public'))
}
