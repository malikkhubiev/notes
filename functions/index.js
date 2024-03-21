const { Router } = require('express')

const authRouter = require('./authRouter')
const noteRouter = require('./noteRouter')

const router = new Router()

router.get('/abc', (req, res)=>{
    console.log(2)
    res.json({message: "hey"})
})
router.use('/auth', authRouter)
router.use('/note', noteRouter)

module.exports = router