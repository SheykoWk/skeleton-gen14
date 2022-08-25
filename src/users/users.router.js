const router = require('express').Router()
const passport = require('passport')
const multer = require('multer')
const { roleAdminMiddleware } = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

router.route('/') //* /api/v1/users/
    .get(userServices.getAll)


router.post('/upload', upload.single('profile_img'), (req, res) => {
    try {
        res.sendFile(req.file);
      }catch(err) {
        res.status(400).send({'message': err.message});
      }
})


router.route('/me')
    .put(passport.authenticate('jwt', {session: false}) ,userServices.editMyUser)
    .get(passport.authenticate('jwt', {session: false}), userServices.getMyUser)
    .delete(passport.authenticate('jwt', {session: false}), userServices.removeMyUser)

router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}),userServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, userServices.remove)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware ,userServices.edit)


exports.router = router