import express from 'express'
import passport from 'passport'

import indexController from '../controllers/index'
import middlewares from '../utils/middlewares'

const router = express.Router()

router.get('', middlewares.authMiddleware, indexController.indexPage)

router.post(
  '/user/register',
  middlewares.preAuthMiddleware,
  indexController.registration
)

router.get('/user/list', indexController.fetchAllUsers)

router.post(
  '/user/login',
  middlewares.preAuthMiddleware,
  passport.authenticate('local'),
  indexController.login
)

router.get('/secret', middlewares.authMiddleware)

router.post('/todos', indexController.createTodo)

router.get('/todos/list', indexController.fetchAllTodos)

export default router
