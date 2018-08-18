'use strict'
const socket = io()

socket.on('connect', () => {
  console.log('Connected to server')

  socket.emit('createMessage' ,{
    'from': 'kishoredevaraj@gmail.com',
    'text': 'Hello there'
  })
})

socket.on('disconnect', () => {
  console.log('Disconnected from the server')
})

socket.on('newMessage', (message) => {
  console.log('New message received ', message)
})
    
    
