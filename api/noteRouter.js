const { Router } = require('express')
const noteController = require('../controllers/noteController')

const router = new Router()

router.get('/:userId/:limit/:offset', noteController.getAll)
router.post('/', noteController.addNote)
router.put('/edit', noteController.editNote)
router.delete('/:id', noteController.deleteNote)

module.exports = router