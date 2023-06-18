import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
const SESSION_SECRET = process.env.SESSION_SECRET || 'XUm_tUQFjn&PW@?9!?'

const config = {
  port: PORT,
  base_url: BASE_URL,
  session_secret: SESSION_SECRET,
}

export default config
