const express = require('express')
const router = express.Router()
const passport = require('passport')

// erster Parameter ist womit diese Authentication funktionieren soll
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/')
    }
)
router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})


module.exports = router