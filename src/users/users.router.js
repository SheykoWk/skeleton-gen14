const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
const { upload } = require('../utils/multer')
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')


router.route('/') //* /api/v1/users/
    .get(userServices.getAll)

router.route('/me')
    .put(passport.authenticate('jwt', {session: false}) ,userServices.editMyUser)
    .get(passport.authenticate('jwt', {session: false}), userServices.getMyUser)
    .delete(passport.authenticate('jwt', {session: false}), userServices.removeMyUser)

router.route('/me/profile-img')
    .post(passport.authenticate('jwt', {session: false}), upload.single('profile_img'), userServices.postProfileImg)
    //.get()

router.route('/:id')
    .get(userServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, userServices.remove)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware ,userServices.edit)


exports.router = router