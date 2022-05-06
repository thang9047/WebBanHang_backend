const router = require('express').Router()
const cateController = require('../controller/categoryController')
const auth = require('../middleware/authen')
const authAdmin = require('../middleware/authenAdmin')

// router.get('/view', cateController.viewCategory)
// router.post('/creatCategory',cateController.creatCategory)
// router.put('/updateCategory/:id',cateController.updateCategory)
// router.delete('delete;id', cateController.delete)
router.route('/category')
    .get(cateController.viewCategory)
    .post(auth, authAdmin, cateController.creatCategory)

router.route('/category/:id')
    .put(auth, authAdmin,cateController.updateCategory)
    .delete(auth, authAdmin, cateController.deleteCategory)
module.exports = router