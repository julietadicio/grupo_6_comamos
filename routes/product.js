var express = require('express');
const path = require('path');
var router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage ({
  destination: (req, file, cb) => {
    cb (null, path.join(__dirname, '../public/img/products'));
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now()+path.extname(file.originalname);
    cb (null, newFileName);
  }
})
const uploadFile = multer({ storage });
const productController = require('../controllers/productController');

/* GET products home page. */
router.get('/login/account-restaurant/products/:idRestaurant', productController.productsList);

/* rutas para crear, editar y eliminar platos */
router.get('/login/account-restaurant/products/:idRestaurant/new', productController.createFormProduct);
router.get('/login/account-restaurant/products/:idRestaurant/edit/:idPlato', productController.editFormProduct);
router.post('/login/account-restaurant/new-product/:idRestaurant', uploadFile.single('img-product') ,productController.createProduct);
router.put('/login/account-restaurant/:idRestaurant/edit-product/:idPlato', uploadFile.single('img-product') ,productController.editProduct);
router.delete('/login/account-restaurant/products/:idRestaurant/delete', productController.deleteProduct);


module.exports = router;
