import createHttpError from 'http-errors'
import morgan from 'morgan'
import logger from './logger'

const stream = {
  write: (message) => logger.http(message),
}

const skip = () => {
  const env = process.env.NODE_ENV || 'development'

  return env !== 'development'
}

const loggingMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
)

const endPoint404 = (req, res, next) => {
  next(createHttpError(404))
}

const errorHandler = (error, req, res, next) => {
  res.locals.message = error.message

  res.locals.error = req.app.get('env') === 'development' ? error : {}

  res.status(error.status || 500)

  res.render('error')

  next(error)
}

const middlewares = {
  loggingMiddleware,
  endPoint404,
  errorHandler,
}

export default middlewares
