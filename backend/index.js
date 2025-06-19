require("dotenv").config();
const cors = require('cors')
const express = require('express')
const app = express()
const WebSocket = require('ws')
const port = process.env.PORT || 3000
const connectDatabase = require('./config/database')
const authRouter = require('./routes/authRoutes')
const journalRoutes = require('./routes/journal-entry-routes')


//middleware to convert data to JSON format
app.use(express.json())
//middleware for cors
app.use(cors())

//connect to mongoDb
  connectDatabase()
  .then(
    app.listen(port, (req,res) => {
      console.log('Mongo db setup, and listening for request')
    })
  )
    .catch((err) => console.log(err))

// Handle user signup and login
app.use('/api/user', authRouter)
app.use('/user', journalRoutes)

//Handle ws connection to deepgram
// app.post('/journal-entries',recorderController)

// const wss = new WebSocket.Server()


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.post('/create', (req, res) =>{
//   const { username, message } = req.body
//   console.log({username, message})
//   res.status(200).send('gotten successfully')
// })
