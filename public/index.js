'use strict'
const socket = io()

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('disconnect', function () {
  console.log('Disconnected from the server')
})

socket.on('newMessage', function (message) {
  const template = jQuery('#message-template').html()
  const timeFormatted = moment(message.createdAt).format('H:mm A')

  const html = Mustache.render(template, {
    'text': message.text,
    'from': message.from,
    'createdAt': timeFormatted
  })
  jQuery('#messages').append(html)
}) 

socket.on('newGeoLocationMessage', function(locationMessage) {
  const template = jQuery('#geolocation-template').html()
  const timeFormatted = moment(locationMessage.createdAt).format('H:mm A')
  const html = Mustache.render(template, {
    'from': locationMessage.from,
    'createdAt': timeFormatted,
    'url': locationMessage.url
  })
  jQuery('#messages').append(html)
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
