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
  let li = jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`)
  jQuery('#messages').append(li)
}) 

socket.on('newGeoLocationMessage', function(locationMessage) {
  console.log('Location message received', locationMessage)
  let li = jQuery('<li></li>')
  let a = jQuery('<a target="_blank">Location Details</a>')
  a.attr('href', locationMessage.url)
  li.text(`${locationMessage.from}: `)
  li.append(a)
  jQuery('#messages').append(li)
})

jQuery('#form-container').submit(function(e) {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  })
})

const sendLocation = jQuery('#geolocation-button')

sendLocation.click(function(e) {
  
  if(!navigator.geolocation){
    alert('Geolocation is not supported')
  }

  navigator.geolocation.getCurrentPosition( function (position) {
    console.log(position)
    socket.emit('geolocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  },function(error){
    console.log('Unable to get location')
  })

})