const router = require('express').Router()

const userServices = require('./users.http')

router.route('/') //* /api/v1/users/
    .get(userServices.getAll)
    .post(userServices.register)

router.route('/:id')
    .get(userServices.getById)
    .delete(userServices.remove)
    .put(userServices.edit)


exports.router = router