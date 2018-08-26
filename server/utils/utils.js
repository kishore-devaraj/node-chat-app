'use strict'
const moment = require('moment')


function generateMessage(text, from) {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
}

function generateLocationMessage(latitude, longitude, from) {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    }
}

function isRealString (str) {
    if(typeof str === 'string' && str.trim().length > 0) {
        return true
    }
    return false
}

module.exports = {
    generateMessage,
    generateLocationMessage,
    isRealString
}