const productCtrl = require('../controller/productController')
const router = require('express').Router()
const auth = require('../middleware/authen')
const authAdmin = require('../middleware/authenAdmin')

router.route('/products')
    .get(productCtrl.getProduct)
    .post(auth, authAdmin, productCtrl.createProduct)

router.route('/products/:id')
    .put(auth, authAdmin, productCtrl.updateProduct)
    .delete(auth, authAdmin, productCtrl.deleteProduct)

module.exports = router