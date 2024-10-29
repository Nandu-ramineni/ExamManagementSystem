import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../Models/User.js';


export const register = async (req, res) => {
    try {
        const { name, email, password, role,rollNumber } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role ,rollNumber});

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '9h' });
            res.json({ token });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Login error', error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

export const getUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
}

export const deleteUserById = async (req, res) => {
    const {id} = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
}

export const getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students' });
    }
};

export const getStaff = async (req, res) => {
    try {
        const staff = await User.find({ role: 'teacher' });
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching staff' });
    }
}