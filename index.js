require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT
const mongoose = require('mongoose')
const app = express()
// npm install passport
// npm install passport-google-oauth20
// npm install express-session
const passport = require('passport')
var session = require('express-session')



require('./config/passport-setup')

// Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))



app.use(session({
    // secret ist wichtig, damit sich cookies / sessions nicht in die quere kommen
    secret: "TEST",
    // soll er die Datei überspeichern, wenn es keine Änderungen gibt?
    resave: false,
    saveUninitialized: true,
    cookie: {
        // Soll der cookie nur bei https gespeichert werden?
        // secure: true,
        maxAge: 43200000 // halber Tag in ms
    }
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(PORT, () => console.log(`http://localhost:${PORT}`)))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.render('index')
})

// Auth Routes
app.use('/auth', require('./routes/authRoutes'))

// const authRoutes = require('./routes/authRoutes')
// app.use('/auth', authRoutes)

app.use('/secret', require('./routes/protectedRoutes'))