
import express from 'express';
import { auth } from '../Middlewares/authMiddleware.js';
import { createExam, deleteExam, getExam, getExams, updateExam } from '../controllers/examController.js';


const router = express.Router();
router.post('/create', auth, createExam);
router.get('/', auth, getExams);
router.get('/:id', auth, getExam);
router.put('/:id', auth, updateExam);
router.delete('/:id', auth, deleteExam);

export default router;
