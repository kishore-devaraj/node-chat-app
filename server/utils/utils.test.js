const expect = require('expect')
const {generateMessage} = require('./utils')

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