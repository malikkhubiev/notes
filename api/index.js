const { Router } = require('express')

const authRouter = require('./authRouter')
const catalogRouter = require('./catalogRouter')
const noteRouter = require('./noteRouter')

const router = new Router()

router.use('/auth', authRouter)
router.use('/catalog', catalogRouter)
router.use('/note', noteRouter)

module.exports = router