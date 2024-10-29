import Question from "../Models/Question.js";
import Exam from "../Models/Exam.js";

export const addQuestion = async (req, res) => {
    const user = req.user;
    try {
        if(user.role !== 'admin' && user.role !== 'teacher') {
            return res.status(403).json({ message: 'Unauthorized! You are not supposed to create question' });
        }
        const { examId, type, text, options, correctAnswers, marks, negativeMarks } = req.body;
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        const question = new Question({ examId, type, text, options, correctAnswers, marks, negativeMarks });
        await question.save();
        exam.questions.push(question._id);
        await exam.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Error adding question', error: error.message });
    }
};

export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(404).json({ message: 'Questions not found' });
    }
};

export const getQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);
        res.status(200).json(question);
    }
    catch (error) {
        res.status(404).json({ message: 'Question not found' });
    }
};

export const getQuestionsByExam = async (req, res) => {
    const { examId } = req.params;
    try {
        const questions = await Question.find({ examId });
        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for this exam' });
        }
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving questions', error: error.message });
    }
};


export const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { examId, type, text, options, correctAnswers, marks, negativeMarks } = req.body;

        const updatedQuestion = await Question.findByIdAndUpdate(
            id,
            { examId, type, text, options, correctAnswers, marks, negativeMarks },
            { new: true }
        );
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(404).json({ message: 'Question not found' });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        await Question.findByIdAndRemove(id);
        res.status(200).json({ message: 'Question deleted successfully' });
    }
    catch (error) {
        res.status(404).json({ message: 'Question not found' });
    }
};