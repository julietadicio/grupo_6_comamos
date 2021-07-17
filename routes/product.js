var express = require('express');
const path = require('path');
var router = express.Router();
const uploadFile = require('../middlewares/multer-product-Middleware');
const productController = require('../controllers/productController');

/* GET products home page. */
router.get('/user/account-restaurant/products', productController.productsList);

/* rutas para crear, editar y eliminar platos */
router.get('/user/account-buisness/products/new', productController.createFormProduct);
router.get('/user/account-buisness/products/edit/:idPlato', productController.editFormProduct);
router.post('/user/account-buisness/new-product', uploadFile.single('img-product') ,productController.createProduct);
router.put('/user/account-buisness/edit-product/:idPlato', uploadFile.single('img-product') ,productController.editProduct);
router.delete('/user/account-buisness/products/:idPlato/delete', productController.deleteProduct);


module.exports = router;
