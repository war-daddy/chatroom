const roomSchema = require("../models/roommodel");


const createRoomController = async (req, res) => {
    try {
        const { name, members } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Room name is required' });
        }

        // If members is a valid array and not empty, use it; otherwise, set a default admin member
        let roomMembers = [];
        if (Array.isArray(members) && members.length > 0) {
            roomMembers = members;
        } else {
            roomMembers = [{ userId: '6704bdf38c12a8d1e8411234', memberType: 'admin' }];
        }

        const newRoom = await roomSchema.create({
            name,
            members: roomMembers,
            messages: []
        });

        res.status(201).json({ message: 'Room created successfully', room: newRoom });
    } catch (error) {
        console.error('Error creating room:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const getRoomController = async (req, res) => {
    // Logic to get all rooms
    const allRooms = await roomSchema.find();
    if (allRooms) {
        return res.status(200).json({ rooms: allRooms });
    } else {
        return res.status(404).json({ message: 'No rooms found' });
    }
    //
    // res.status(200).json({ rooms: [] }); // Replace with actual room data
};

const joinRoomController = async (req, res) => {
    try {
        const { roomId, userId } = req.body;
        if (!roomId || !userId) {
            return res.status(400).json({ message: 'Room ID and User ID are required' });
        }

        const room = await roomSchema.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Check if user is already a member
        const isMember = room.members.some(member => member.userId.toString() === userId);
        if (isMember) {
            return res.status(200).json({ message: 'User already a member of the room', room });
        }

        // Add user as a member
        room.members.push({ userId, memberType: 'member' });
        await room.save();

        res.status(200).json({ message: 'User added to the room successfully', room });
    } catch (error) {
        console.error('Error joining room:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const getRoomByIdController = async (req, res) => {
    try {
        const { roomId } = req.params;
        if (!roomId) {
            return res.status(400).json({ message: 'Room ID is required' });
        }

        const room = await roomSchema.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json({ room });
    } catch (error) {
        console.error('Error fetching room by ID:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};  

module.exports = { createRoomController, getRoomController,joinRoomController, getRoomByIdController };