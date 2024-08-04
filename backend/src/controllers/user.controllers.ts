import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateTokenAndSetCookie from '../utils/generateToken';

export const registerController = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    try {
        if (!email || !password || !firstName) {
            return res
                .status(400)
                .json({ message: 'Please fill all the fields!' });
        }

        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({
                message: 'User with this email already exists'
            });
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: passwordHashed,
            firstName,
            lastName
        });

        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json(newUser);
    } catch (error) {
        console.log('Error in register controller: ', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json(user);
    } catch (error) {
        console.log('Error in login controller: ', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};

export const tokenController = (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
};

export const logoutController = (req: Request, res: Response) => {
    try {
        res.cookie('auth_token', '', { maxAge: 0 });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log('Error in logout controller', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
