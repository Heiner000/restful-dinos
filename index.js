// required packages
const express = require('express')
const fs = require('fs')

// app config
const app = express()
const PORT = 8000
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false }))

// controllers
app.use("/dinos", require("./controllers/dinos"))
app.use("/creatures", require("./controllers/creatures"))

// routes
// GET / -- index show route for the app
app.get('/', (req, res) => {
    res.render('index.ejs')
})

// listen on a port
app.listen(PORT, () => {console.log(`is that RESTful 🦖 dinos I hear? on ${PORT} 🦕`)})