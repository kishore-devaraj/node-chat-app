'use strict'
const socket = io()

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('disconnect', function () {
  console.log('Disconnected from the server')
})

socket.on('newMessage', function (message) {
  let timeFormatted = moment(message.createdAt).format('H:mm A')
  console.log('New message received ', message)
  let li = jQuery('<li></li>')
  li.text(`${message.from} ${timeFormatted}: ${message.text}`)
  jQuery('#messages').append(li)
}) 

socket.on('newGeoLocationMessage', function(locationMessage) {
  console.log('Location message received', locationMessage)
  let timeFormatted = moment(locationMessage.createdAt).format('H:mm A')
  let li = jQuery('<li></li>')
  let a = jQuery('<a target="_blank">Location Details</a>')
  a.attr('href', locationMessage.url)
  li.text(`${locationMessage.from} ${timeFormatted}: `)
  li.append(a)
  jQuery('#messages').append(li)
})

jQuery('#form-container').submit(function(e) {
  e.preventDefault()
  const messageField = jQuery('[name=message]')
  socket.emit('createMessage', {
    from: 'User',
    text: messageField.val()
  }, function () {
    messageField.val('')
  })
})

const sendLocation = jQuery('#geolocation-button')

sendLocation.click(function(e) {
  
  if(!navigator.geolocation){
    alert('Geolocation is not supported')
  }
  sendLocation.attr('disabled', 'disabled').text('Sending Location')

  navigator.geolocation.getCurrentPosition( function (position) {
    console.log(position)
    socket.emit('geolocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    sendLocation.removeAttr('disabled').text('Send Location')
  },function(error){
    sendLocation.removeAttr('disabled').text('Send Location')
    console.log('Unable to get location')
  })

})
