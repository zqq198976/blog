import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import toolRoutes from './routes/tools.js'
import path from 'path'
import { fileURLToPath } from 'url'
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/tools', toolRoutes)
app.listen('9999', () => {
	console.log('Connected')
})
