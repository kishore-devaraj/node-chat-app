class Users {
    constructor () {
        this.users = []
    }

    findUser (id) {
        let user = this.users.filter(user => user.id === id)[0]
        return user
    }

    removeUser (id) {
        let userToBeRemoved = this.findUser(id)
        if (userToBeRemoved) {
            this.users = this.users.filter(user => user !== userToBeRemoved)
        }
        return userToBeRemoved
    }

    getUsersList (room) {
      let usersList = this.users.filter( user => user.room === room)
      let usersListName = usersList.map(user => user.name)
      return usersListName
    }

    addUser (id, name, room) {
        const user = {id, name, room}
        this.users.push(user)
        return user
    }
}

module.exports = {
    Users
}