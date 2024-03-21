const { Router } = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const authController = require('../controllers/authController')
const { check } = require('express-validator')

const router = new Router()

router.post('/registration', [
    check('name', 'Username should not be empty').notEmpty(),
    check('name', 'Username should be more than 8 and less than 16').isLength({min: 8, max: 16}),
    check('password', 'Password should be more than 8 and less than 16').isLength({min: 8, max: 16})
], authController.registration)
router.delete('/deleteAccount/:id/:password', authController.deleteAccount)
router.post('/login', authController.login)
router.get('/auth', authMiddleware, authController.getIsAuth)

module.exports = router