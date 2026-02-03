import express from 'express'

const router = express.Router()

// Basit admin credentials (production'da .env'den alınmalı)
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'cronbi2024'

// Session store (basit in-memory, production'da Redis kullanılmalı)
const sessions = new Map()

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Basit session token oluştur
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36)
    sessions.set(token, { username, createdAt: Date.now() })

    res.json({
      success: true,
      token,
      message: 'Giriş başarılı!'
    })
  } else {
    res.status(401).json({
      success: false,
      error: 'Kullanıcı adı veya şifre hatalı!'
    })
  }
})

// Verify token
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (token && sessions.has(token)) {
    res.json({ valid: true, user: sessions.get(token) })
  } else {
    res.status(401).json({ valid: false })
  }
})

// Logout
router.post('/logout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (token) {
    sessions.delete(token)
  }

  res.json({ success: true, message: 'Çıkış yapıldı.' })
})

// Auth middleware export
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (token && sessions.has(token)) {
    req.user = sessions.get(token)
    next()
  } else {
    res.status(401).json({ error: 'Yetkisiz erişim!' })
  }
}

export default router
