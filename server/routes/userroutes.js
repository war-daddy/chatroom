const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');        
const { getUserController } = require('../controllers/usercontrollers');
const authMiddleware = require('../middlewares/authmiddleware');
// Get all users

// routes || user || get

// router.get('/getusers',authMiddleware, getUserController);
router.get('/getusers', getUserController);
module.exports = router;