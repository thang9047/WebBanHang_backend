const router = require('express').Router()
const cateController = require('../controller/categoryController')

// router.get('/view', cateController.viewCategory)
// router.post('/creatCategory',cateController.creatCategory)
// router.put('/updateCategory/:id',cateController.updateCategory)
// router.delete('delete;id', cateController.delete)
router.route('/category')
    .get(cateController.viewCategory)
    .post(cateController.creatCategory)

router.route('/category/:id')
    .put(cateController.updateCategory)

module.exports = router