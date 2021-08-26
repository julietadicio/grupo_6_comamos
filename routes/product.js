var express = require('express');
const path = require('path');
var router = express.Router();
const uploadFile = require('../middlewares/multer-product-Middleware');
const authBuisnessMiddleware = require('../middlewares/authBuisnessMiddleware');
const productController = require('../controllers/productController');

/* GET products home page. */
router.get('/buisness/account/products', productController.productsList);
router.get('/product/:idPlato', productController.detailProduct);

/* rutas para crear, editar y eliminar platos */
router.get('/buisness/account/products/new', authBuisnessMiddleware,productController.createFormProduct);
router.get('/buisness/account/products/edit/:idPlato', authBuisnessMiddleware, productController.editFormProduct);
router.post('/buisness/account/new-product', uploadFile.single('img-product') ,productController.createProduct);
router.put('/buisness/account/edit-product/:idPlato', uploadFile.single('img-product') ,productController.editProduct);
router.delete('/buisness/account/products/:idPlato/delete', productController.deleteProduct);

module.exports = router;
