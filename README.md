## node-chat-app
#### What's this repo all about?
This repo contains a chat application created using nodejs socket.io library and powered by express framework. It serves as
a guide for implementing one-to-one, one-to-many and broadcast type of chat application using web socket technology.

##### [Live version](https://kishore-node-chat-app.herokuapp.com/) of this repo is hosted in heroku platform.

### Features
- **Room** : This chat application is basically built upon the room concept, where anyone can join or leave at anytime.
- **GeoLocation** : User can send his/her location to others using the 'Send Location' button, which is integrated using browser's native geolocation api.
- **Online Status** : Your online status will be broadcasted to all, who are all in the same room.
- **Ease of Access** : No registration is required, you can directly jump in and ignite the conversation.
- **Mobile First** : The application is developed with 'Mobile First' moto, so it can be accesed via mobile browser such as Chrome for Android.

### Roadmap
This chat application can be further enhanced. Following are the features are about to be added in the near future
- **Persistent Storage** - MongoDB can be integrated to store messages history.
- **One to One Chat** - Should have the ablity to chat with the individual from the same room.
- **Mulitmedia Messages** - Images, Documents and other arbitary data sharing feature should be included.

### Installation in local environment
- Clone and Download this repo 
```
git clone https://github.com/kishore-devaraj/node-chat-app
```

- Install the dependencies 
```
npm install
```
- Run the tests to make sure everything works fine
```
npm test
```
- If everything works fine, start the server and checkout out localhost:3000 in your browser.
```
npm run start
```

### For Development 
- Use the following commands while developing
```
npm run test-watch
npm run start-watch
```

### Warnings 
- The geolocation works only on secure connection, so make sure your deployment machine has SSL/TLS certificate or use third party cloud, although it works fine in local development.
- Muliple login is not supported yet, so when you login with the same name in the same room, you may experience certain unexpected output.
- The application was developed and tested only in Chrome, although it supports other browsers but it's not tested yet.
- Messages are not stored, so when you hit refresh or close the tab, old messages cannot be viewed.
