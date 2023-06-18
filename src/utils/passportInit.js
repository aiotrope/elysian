import * as passportLocal from 'passport-local'
import bcrypt from 'bcrypt'

export const passportInit = (passport, getUserByUsername, getUserById) => {
  const authenticateUser = async (username, password, done) => {
    const user = getUserByUsername(username)
    if (user === null) {
      return done(null, false, { message: 'User not found!' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Incorrect login credentials!' })
      }
    } catch (err) {
      return done(err)
    }
  }
  const LocalStrategy = passportLocal.Strategy

  passport.use(
    new LocalStrategy({ usernameField: 'username' }, authenticateUser)
  )
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}
