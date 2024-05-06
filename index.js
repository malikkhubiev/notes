require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const path = require('path')

const router = require('./api/index')
const errorHandler = require('./middleware/errorHandler')

const PORT = process.env.PORT || 5000

const app = express() 
app.use(cors())
app.use(express.json())
app.get('/ping', (req, res) => {
    res.send('pong');
});
app.use('/api', router)
app.use(errorHandler)

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, "dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})

const startApp = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=>console.log('Server is working'))        
    } catch (e) {
        console.log(e)
    }
}

startApp()