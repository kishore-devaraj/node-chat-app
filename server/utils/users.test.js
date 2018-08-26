const expect = require('expect')
const {Users} = require('./users')

describe ('Users Class Tests', () => {

    let users;
    beforeEach(() => {
        users = new Users()
        users.users = [{
            id: 1,
            name: 'Kishore',
            room: 'ReactJS'
        }, {
            id: 2,
            name: 'Devaraj',
            room: 'NodeJS'
        }, {
            id: 3,
            name: 'Krimson',
            room: 'ReactJS'
        }]
    })
    it('should add new user', () => {
        let usersObj = new Users()
        let user = {
            name: 'Kishore',
            room: 'javascript',
            id: '34543535'
        }
        let newUser = usersObj.addUser(user.id, user.name, user.room)
        expect(usersObj.users).toEqual([user])
    })

    it('should return users list for the room', () => {
        const room = 'ReactJS'
        let usersListName = users.getUsersList(room)
        expect(usersListName).toEqual(['Kishore', 'Krimson'])
    })

    it('should return user by valid id', () => {
        const id = 1
        let user = users.findUser(id)
        expect(user.id).toBe(id)
    })

    it('should not return user by invalid id', () => {
        const id = 22
        let user = users.findUser(id)
        expect(user).toNotExist()
    })

    it('should remove user on valid id', () => {
        it('should remove user on valid id', () => {
            const id = 1
            let user = users.removeUser(id)
            expect(user.id).toBe(id)
            expect(users.length).toBe(2)
        })  
    })

    it('should not remove user on invalid id', () => {
        const id = 22
        let user = users.removeUser(id)
        // console.log(users)
        expect(user).toNotExist()
        expect(users.users.length).toBe(3)
    })

    it('should return user by valid name', () => {
        const name = 'Kishore'
        let user = users.findUserByName(name)
        expect(user).toInclude({
            name: 'Kishore',
            room: 'ReactJS'
        })
    })

    it('should not return user by invalid name', () => {
        const name = 'Pumbha'
        let user = users.findUserByName(name)
        expect(user).toNotExist()
    })
})