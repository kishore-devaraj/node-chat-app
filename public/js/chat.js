'use strict'
const socket = io()

socket.on('connect', function () {
  const params = jQuery.deparam(window.location.search)
  console.log(params)
  socket.emit('join', params, function(err) {
    if (err) {
      alert(err)
      window.location.href = '/'
    }
    console.log('No errors')
  })
  console.log('Connected to server')
})

socket.on('disconnect', function () {
  console.log('Disconnected from the server')
})

socket.on('updatedUserList', function(users) {
  console.log(`Users list: ${users}`)
  let ol = jQuery('<ol></ol>')
  users.forEach(user => {
    ol.append(jQuery('<li></li>').text(user))
  })

  jQuery('#users').html(ol)
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
  scrollToBottom()
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
  scrollToBottom()
})

jQuery('#form-container').submit(function(e) {
  e.preventDefault()
  const messageField = jQuery('[name=message]')
  socket.emit('createMessage', {
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


// Utils 

function scrollToBottom (){
  const messages = jQuery('#messages')
  const newMessage = messages.children('li:last-child')

  const scrollHeight = messages.prop('scrollHeight')
  const clientHeight = messages.prop('clientHeight')
  const scrollTop = messages.prop('scrollTop')

  const newMessageHeight = newMessage.innerHeight()
  const prevMessageHeight = newMessage.prev().innerHeight()

  if (scrollTop +  clientHeight + newMessageHeight + prevMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight)
  }
}