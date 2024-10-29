
import express from 'express';
import { deleteUserById, getStaff, getStudents, getUser, getUsers, login, register } from '../controllers/authController.js';


const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);
router.get('/user/:id',getUser);
router.get('/students', getStudents);
router.get('/staff', getStaff);
router.delete('/user/:id', deleteUserById);
export default router;
