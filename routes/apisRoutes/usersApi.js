const express = require('express');
const router = express.Router();

const buisnessController = require('../../controllers/apisControllers/usersApiController');

router.get('/users',  buisnessController.usersList);
router.get('/users/:idUser',  buisnessController.selectUser);
router.post('/users/shop',  buisnessController.userShop);

module.exports = router;