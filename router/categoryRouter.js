const router = require('express').Router()
const cateController = require('../controller/categoryController')

router.get('/view', cateController.viewCategory)
router.post('/creatCategory',cateController.creatCategory)
router.put('/updateCategory/:id',cateController.updateCategory)
// router.delete('delete;id', cateController.delete)

module.exports = router