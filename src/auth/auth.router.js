const router = require('express').Router()

const authServices = require('./auth.http')

router.post('/login', authServices.login)

exports.router = router    