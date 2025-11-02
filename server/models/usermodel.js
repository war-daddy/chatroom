const mongoose = require('mongoose');

//schema for user
const userSchema = new mongoose.Schema({
    username: { type: String, required: [true,"username is required"], unique: true },
    email: { type: String, required: [true,"email is required"], unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: 'https://cdn-icons-png.freepik.com/512/10337/10337609.png' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;