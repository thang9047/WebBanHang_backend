const router = require('express').Router()
const userController = require('../controller/userController')
// const auth = require('../middleware/authen')



router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/logout', userController.logout)

router.get('/refresh_token', userController.refreshToken)

// router.get('/infor', auth, userController.getUser)

module.exports = router