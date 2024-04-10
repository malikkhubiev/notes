const { Router } = require('express')
const noteController = require('../controllers/noteController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.get('/getOne/:id', authMiddleware, noteController.getOne)
router.get('/:limit/:offset', authMiddleware, noteController.getAll)
router.post('/', authMiddleware, noteController.addNote)
router.put('/send', authMiddleware, noteController.sendNote)
router.put('/edit', authMiddleware, noteController.editNote)
router.delete('/:id', authMiddleware, noteController.deleteNote)

module.exports = router