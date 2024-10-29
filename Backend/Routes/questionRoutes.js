
import express from 'express';
import { auth } from '../Middlewares/authMiddleware.js';
import { addQuestion, deleteQuestion, getQuestion, getQuestions, getQuestionsByExam, updateQuestion } from '../controllers/questionController.js';

const router = express.Router();
router.post('/add', auth, addQuestion);
router.get('/', auth, getQuestions);
router.get('/:id', auth, getQuestion);
router.get('/exam/:examId', auth, getQuestionsByExam); 
router.put('/:id', auth, updateQuestion);
router.delete('/:id', auth, deleteQuestion);


export default router;
