const express = require('express')
const router = express.Router()

const authCheck = (req, res, next) => {
    // console.log(new Date().getTime(), req.user)
    if (!req.user) {
        res.redirect('/')
    } else {
        next()
    }
}

router.get('/', authCheck, (req, res) => {
    res.render('protected')
})

module.exports = router