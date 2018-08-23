const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/utils')

const publicDir = path.join(__dirname, '../public')

// Global variables
const port = process.env.PORT || 3000

const app = express()
app.use(express.static(publicDir))
const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket) => {
  console.log('Client connected')
  
  socket.emit('newMessage', generateMessage('Welcome to the site','Admin'))

  socket.broadcast.emit('newMessage', generateMessage('New User Join','Admin'))

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })

  socket.on('createMessage', (message, callback) => {
    console.log('New Message created ',message)
    
    io.emit('newMessage', generateMessage(message.text, message.from))
    callback()
  })
})


server.listen(port, (err) => {
  if (!err) {
    return console.log(`Express successufully started at ${port} port`)
  }
  console.log(`Error occured while staring express server at ${port} port`)
})