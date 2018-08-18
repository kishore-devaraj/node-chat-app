'use strict'
const socket = io()

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('disconnect', function () {
  console.log('Disconnected from the server')
})

socket.on('newMessage', function (message) {
  console.log('New message received ', message)
})
    
// socket.on('welcome', function (welcomeMessage) {
//   console.log(welcomeMessage)
// })

// socket.on('newUser', function (newUserMessage) {
//   console.log(newUserMessage)
// })
