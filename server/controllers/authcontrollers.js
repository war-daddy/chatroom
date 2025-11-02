const userModel = require('../models/usermodel'); // Correct filename
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // existing user check would go here
        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }   
        // Simulate user creation
        // hasing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Store hashed password instead of plain text
        // const newUser = new userModel({ username, email, password: hashedPassword });
        // await newUser.save();        
        const newUser = await userModel.create({ username, email, password: hashedPassword });
        // await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' ,newUser});
    } catch (error) {
        console.error('Error in registerController:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const loginController = async (req, res) => {
    // Login logic would go here
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await userModel.findOne({ email });
        const isMatch = user ? await bcrypt.compare(password, user.password) : false;
        if (!user || !isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.status(200).json({ message: 'Login successful' ,token,user});
    } catch (error) {
        console.error('Error in loginController:', error);
        return res.status(500).json({ message: 'Server error' });
    }

}

module.exports = { registerController , loginController };