require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connection to MongoDB Successful'))

app.use(express.json())

const teamsRouter = require('./routes/nfl/teams')
app.use('/nfl', teamsRouter)

const playersRouter = require('./routes/nfl/players')
app.use('/nfl', playersRouter)

app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`)
})

