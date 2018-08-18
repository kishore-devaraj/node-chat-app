const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const publicDir = path.join(__dirname, '../public')

// Global variables
const port = process.env.PORT || 3000

const app = express()
app.use(express.static(publicDir))
const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket) => {
  console.log('Client connected')
  
  socket.emit('newMessage', {
    from: 'admin',
    text: 'Welcome to the site',
    craetedAt: new Date().getTime()
  })

  socket.broadcast.emit('newMessage',{
    from: 'admin',
    text: 'New user join',
    craetedAt: new Date().getTime()
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })

  socket.on('createMessage', (message) => {
    console.log('New Message created ',message)
    
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })
})


server.listen(port, (err) => {
  if (!err) {
    return console.log(`Express successufully started at ${port} port`)
  }
  console.log(`Error occured while staring express server at ${port} port`)
})