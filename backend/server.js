const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  const normalizedEmail = (email || '').trim().toLowerCase()
  const normalizedPassword = (password || '').trim()
  const expectedEmail = 'poovarasan@netflixclone.com'
  const expectedPassword = 'Remember@9'

  if (!normalizedEmail || !normalizedPassword) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.',
    })
  }

  const isValidUser =
    normalizedEmail === expectedEmail && normalizedPassword === expectedPassword

  if (!isValidUser) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    })
  }

  return res.json({
    success: true,
    message: 'Login successful.',
  })
})

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
