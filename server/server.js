const express = require('express')
const path = require('path')
const publicDir = path.join(__dirname, '../public')

const app = express()
const port = process.env.PORT || 3000
app.use(express.static(publicDir))

app.listen(port, (err) => {
  if (!err) {
    return console.log(`Express successufully started at ${port} port`)
  }
  console.log(`Error occured while staring express server at ${port} port`)
})