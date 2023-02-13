const express = require('express')
const app = express()
const { PORT } = require('./constants')

//import routes
const authRoutes = require('./routes/auth')

app.use(express.json())

//initialize routes
app.use('/api', authRoutes)


const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`App running on PORT ${PORT}`)
        })
    } catch (error){
        console.log(`Error: ${error.messsage}`)
    }
}


appStart()