import bcrypt from 'bcrypt'
import passport from 'passport'
import createHttpError from 'http-errors'

import { passportInit } from '../utils/passportInit'
import logger from '../utils/logger'

let Users = new Array()
let Todos = []

passportInit(
  passport,
  (username) => Users.find((user) => user.username === username),
  (id) => Users.find((user) => user.id === id)
)

const indexPage = async (req, res) => {
  //logger.warn(req.user) // from passport
  logger.warn(req.user)
  if (req.user)
    res.render('index', { title: 'Elysian', username: req.user.username })
}

const registration = async (req, res) => {
  let { username, password } = req.body

  const foundUser = Users.find((elem) => elem.username === username)

  if (foundUser) return res.status(400).end()

  try {
    const saltRounds = 10

    const hashed = await bcrypt.hash(password, saltRounds)

    let generateId = Math.floor(Math.random() * 899999 + 100000)

    let data = {
      id: generateId,
      username: username,
      password: hashed,
    }

    Users.unshift(data)

    const newUser = Users.find((elem) => elem.username === data.username)

    if (newUser) res.status(200).json(data)
  } catch (err) {
    logger.error(err.message)
    res.status(400).json({ error: err.message })
  }
}

const fetchAllUsers = async (req, res) => {
  try {
    res.status(200).json([...Users])
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const login = async (req, res) => {
  const { username, password } = req.body

  let user = Users.find((user) => user.username === username)

  const passwordVerified = await bcrypt.compare(password, user.password)

  if (!passwordVerified || !user) return res.status(401).end()

  if (!req.user) return res.status(401).end()

  try {
    req.session.userId = req.user.id
    req.session.userName = req.user.username

    return res.status(200).send('ok')
  } catch (err) {
    logger.error(err)
    res.status(400).json({ error: err.message })
  }
}

const createTodo = (req, res, next) => {
  let { todo } = req.body

  if (!req.user) return next(createHttpError(401))

  try {
    let userTodosIndex = Todos.findIndex(
      (todo) => todo.id === req.session.userId
    )

    let userTodos = Todos.find((todo) => todo.id === req.session.userId)

    let data = {
      id: req.session.userId,
      todos: [todo],
    }

    if (userTodosIndex !== -1) {
      Todos[userTodosIndex].todos.push(todo)
      logger.warn([...Todos])
      return res.status(200).json(userTodos)
    } else {
      Todos.unshift(data)
      return res.status(200).json(data)
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const fetchAllTodos = (req, res) => {
  try {
    res.status(200).json([...Todos])
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export default {
  indexPage,
  registration,
  fetchAllUsers,
  login,
  createTodo,
  fetchAllTodos,
}
