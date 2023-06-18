import config from './utils/config'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session'
import passport from 'passport'
import methodOverride from 'method-override'

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

app.use(
  session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())

app.use(passport.session())

app.use(methodOverride('_method'))

app.use(cors())

app.use(helmet())

app.use(require('sanitize').middleware)

app.use(middlewares.loggingMiddleware)

app.use('/api', indexRouter)

app.use(middlewares.endPoint404)

app.use(middlewares.errorHandler)

app.listen(config.port, () => {
  logger.http(`Server is running on port ${config.port}`)
})
