const router = require('express').Router()

const userServices = require('./users.http')

router.route('/') //* /api/v1/users/
    .get(userServices.getAll)
    .post(userServices.register)


exports.router = router