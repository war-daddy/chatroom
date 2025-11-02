const express = require('express');
const { getRoomController, createRoomController, joinRoomController, getRoomByIdController } = require('../controllers/roomcontrollers');
const router = express.Router();


// routes || room || get

router.get('/getrooms', getRoomController);

// routes || room || room

router.post('/createroom', createRoomController);

// route || room-join || post

router.post('/joinroom', joinRoomController);

// route || get room by id || get

router.get('/getroom/:roomId', getRoomByIdController);


module.exports = router;