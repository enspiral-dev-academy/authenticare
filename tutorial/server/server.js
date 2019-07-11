const path = require('path')
const express = require('express')

const authRoutes = require('./routes/auth')
const fruitRoutes = require('./routes/fruits')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1', authRoutes)
server.use('/api/v1/fruits', fruitRoutes)

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

module.exports = server
