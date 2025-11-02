const express = require('express');
const { registerController,loginController } = require('../controllers/authcontrollers');
const router = express.Router();

//routes
//register || post
router.post('/register', registerController); 
// login || post
router.post('/login', loginController);

module.exports = router;