import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8080

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080'

const config = {
  port: PORT,
  base_url: BASE_URL,
}

export default config
