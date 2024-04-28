import express from 'express'
import { initWebRoutes } from './routes/router.js'
import { initApiRoutes } from './routes/api.js'
import { configViewsEngine } from './configs/viewsEngine.js'

import 'dotenv/config'
const app = express()
const port = process.env.PORT || 5000

app.use(function (req, res, next) {
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

configViewsEngine(app)
// page
initWebRoutes(app)
// api
initApiRoutes(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
