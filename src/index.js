import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'

import config from './utils/config'
import middlewares from './utils/middlewares'
import logger from './utils/logger'

import indexRouter from './routes'

const app = express()

app.set('views', path.join(__dirname, '../views'))

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '../public')))

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use(cors())

app.use(helmet())

app.use(require('sanitize').middleware)

app.use(middlewares.loggingMiddleware)

app.use('/', indexRouter)

app.use(middlewares.endPoint404)

app.use(middlewares.errorHandler)

app.listen(config.port, () => {
  logger.http(`Server is running on port ${config.port}`)
})
