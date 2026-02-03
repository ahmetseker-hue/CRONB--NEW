import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from 'dotenv'
import contactRoutes from './routes/contact.js'
import authRoutes, { authMiddleware } from './routes/auth.js'

config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)

// Protected admin routes
app.get('/api/admin/messages', authMiddleware, (req, res) => {
  // Contact controller'dan mesajları al
  import('./controllers/contactController.js').then(({ getContactsForAdmin }) => {
    getContactsForAdmin(req, res)
  })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Bir hata oluştu!' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
