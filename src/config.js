import {config} from 'dotenv'

config()

export const PORT = process.env.PORT || 3000
export const DB_HOST = process.env.DB_HOST || localhost
export const DB_USER = process.env.DB_USER || root
export const DB_PASSWORD = process.env.DB_PASSWORD || mysqladmin
export const DB_DATABASE = process.env.DB_DATABASE || empresadb
export const DB_PORT = process.env.DB_PORT || 3306
export const USER_EMAIL = process.env.USER_EMAIL
export const EMAIL_PASS = process.env.EMAIL_PASS