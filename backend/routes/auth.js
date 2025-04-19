import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const {fullName, email, passwordHash} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'Email already in use, kindly login.'});
        }

        const salt = bcrypt.genSalt(10);
        const passwordHash = bcrypt.hash(passwordHash, salt);

        const newUser = new User({fullName, email, passwordHash});
        await newUser.save();

        res.status(201).json({message: 'User created successfully!'});
    } catch (err) {
        res.status(202).json({message: 'Error creating user, please try again later.'});
    }
    });

export default router;

