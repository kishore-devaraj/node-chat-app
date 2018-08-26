const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage, isRealString} = require('./utils/utils')
const {Users} = require('./utils/users')

const publicDir = path.join(__dirname, '../public')

// Global variables
const port = process.env.PORT || 3000
let users = new Users()

const app = express()
app.use(express.static(publicDir))
const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket) => {
  console.log('Client connected')
  
  socket.on('disconnect', () => {
    console.log('Client disconnected')
    let user = users.removeUser(socket.id)
    if (user) {
      io.to(user.room).emit('updatedUserList', users.getUsersList(user.room))
      io.to(user.room).emit('newMessage', generateMessage(`${user.name} has left`, 'Admin'))
    }
  })

  socket.on('createMessage', (message, callback) => {
    let user = users.findUser(socket.id)

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(message.text, user.name))
      callback()
    } 
  })

  socket.on('geolocationMessage', (coords) => {
    let user = users.findUser(socket.id)
    if (user) {
      io.to(user.room).emit('newGeoLocationMessage', generateLocationMessage(coords.latitude, coords.longitude, user.name))
    }
  })

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) && !isRealString(params.room)){
      return callback('Enter the name and room')
    } 

    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name,params.room)

    /**
     * io.emit - To all Users
     * socket.broadcast.emit - To all except self
     * socket.emit - One to One
     * 
     * For rooms we use the first two
     * io.to(room).emit
     * socket.broadcast.to(room).emit
     */
    
    socket.emit('newMessage', generateMessage('Welcome to the site','Admin'))
    socket.broadcast.to(params.room).emit('newMessage', generateMessage(`${params.name} Joined`,'Admin'))
    io.to(params.room).emit('updatedUserList', users.getUsersList(params.room))
  })
})


server.listen(port, (err) => {
  if (!err) {
    return console.log(`Express successufully started at ${port} port`)
  }
  console.log(`Error occured while staring express server at ${port} port`)
})