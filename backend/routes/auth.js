import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../utils/dbManager.js';
import userModelFactory from '../models/userModel.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { fullName, email, password, role } = req.body;

    if (!password || typeof password !== 'string') {
        return res.status(400).json({ message: 'Password is required and must be a string' });
    }

    if (!['CEO', 'Senior Manager', 'Product Manager'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role selected' });
    }

    try {
        const db = await getDbConnection(role);
        const User = userModelFactory(db);

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ fullName, email, passwordHash: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    if (!['CEO', 'Senior Manager', 'Product Manager'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role selected' });
    }

    try {
        const db = await getDbConnection(role);
        const User = userModelFactory(db);

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'fallbacksecretkey',
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
