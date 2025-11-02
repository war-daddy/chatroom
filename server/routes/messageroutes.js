const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messagecontrollers");

const router = express.Router();

// Send message
router.post("/:roomId/send", sendMessage);

// Get messages of a room
router.get("/:roomId", getMessages);

module.exports = router;
