const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')

router.route('/') //* /api/v1/users/
    .get(userServices.getAll)
    .post(userServices.register)

router.route('/me')
    .put(passport.authenticate('jwt',{session: false}) ,userServices.editMyUser)

router.route('/:id')
    .get(userServices.getById)
    .delete(userServices.remove)
    .put(userServices.edit)


exports.router = router