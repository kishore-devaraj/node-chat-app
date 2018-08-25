const expect = require('expect')
const {generateMessage, generateLocationMessage} = require('./utils')

describe('Utils tests', () => {
    it('should return generated message', () => {
        let from = 'Admin'
        let text = 'Hello from Admin'
        let result = generateMessage(text, from)
        expect(result.createdAt).toBeA('number')
        expect(result).toInclude({
          'from': 'Admin',
          'text': 'Hello from Admin'  
        })
    })
})

describe('Location Generation Tests', () => {
    it('should generate location object', () => {
        let from = 'Admin'
        let latitude = '13.0258465,80'
        let longitude = '22285819999999'
        let result = generateLocationMessage(latitude, longitude, from)
        expect(result.createdAt).toBeA('number')
        expect(result).toInclude({
            'from': 'Admin',
            'url': `https://www.google.com/maps?q=${latitude},${longitude}`
        })
    })
})