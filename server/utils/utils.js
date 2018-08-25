'use strict'

function generateMessage(text, from) {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}

function generateLocationMessage(latitude, longitude, from) {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    }
}
module.exports = {
    generateMessage,
    generateLocationMessage
}