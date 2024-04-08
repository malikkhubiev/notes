const { Router } = require('express')
const catalogController = require('../controllers/catalogController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.get('/', authMiddleware, catalogController.getAll)
router.post('/', authMiddleware, catalogController.addCatalog)
router.put('/editName', authMiddleware, catalogController.editCatalogName)
router.delete('/:id', authMiddleware, catalogController.deleteCatalog)

module.exports = router