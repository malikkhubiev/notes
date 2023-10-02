const { Router } = require('express')

const authRouter = require('./authRouter')
const noteRouter = require('./noteRouter')

const router = new Router()

router.use('/auth', authRouter)
router.use('/note', noteRouter)

module.exports = router