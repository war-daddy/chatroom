const Room = require("../models/roommodel");

// 📩 Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { senderId, text } = req.body;

    if (!text || !senderId)
      return res.status(400).json({ message: "Sender and text are required" });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const message = { sender: senderId, text };
    room.messages.push(message);
    await room.save();

    // Populate sender info for better frontend display
    const populatedRoom = await Room.findById(roomId)
      .populate("messages.sender", "username email");

    res.status(201).json({
      success: true,
      message: "Message sent",
      room: populatedRoom
    });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ message: err.message });
  }
};

// 📜 Get all messages from a room
exports.getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId).populate(
      "messages.sender",
      "username email"
    );
    if (!room) return res.status(404).json({ message: "Room not found" });

    res.status(200).json({
      success: true,
      messages: room.messages
    });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: err.message });
  }
};
