import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../../data/cronbi.db')

// Initialize database
const db = new Database(dbPath)

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

export const submitContact = (req, res) => {
  try {
    const { name, email, company, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Ad, e-posta ve mesaj alanları zorunludur.'
      })
    }

    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, company, message)
      VALUES (?, ?, ?, ?)
    `)

    const result = stmt.run(name, email, company || null, message)

    res.status(201).json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi!',
      id: result.lastInsertRowid
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    res.status(500).json({ error: 'Mesaj gönderilemedi.' })
  }
}

export const getContacts = (req, res) => {
  try {
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all()
    res.json(contacts)
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({ error: 'Mesajlar alınamadı.' })
  }
}

export const getContactsForAdmin = (req, res) => {
  try {
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all()
    const stats = db.prepare('SELECT COUNT(*) as total FROM contacts').get()
    res.json({
      contacts,
      stats: {
        total: stats.total,
        today: db.prepare("SELECT COUNT(*) as count FROM contacts WHERE date(created_at) = date('now')").get().count
      }
    })
  } catch (error) {
    console.error('Get contacts for admin error:', error)
    res.status(500).json({ error: 'Mesajlar alınamadı.' })
  }
}
