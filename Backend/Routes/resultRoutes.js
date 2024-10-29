
import express from 'express';
import { auth } from '../Middlewares/authMiddleware.js';
import { getResultByStudent, getResultsByExam, publishResult } from '../Controllers/resultController.js';


const router = express.Router();
router.post('/publish', auth, publishResult);
router.get('/:examId', auth, getResultsByExam);
router.get('/:examId/:studentId', auth, getResultByStudent);
export default router;
