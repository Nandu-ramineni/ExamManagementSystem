import Exam from "../Models/Exam.js";

export const createExam = async (req, res) => {
    const user = req.user;
    try {   
        if(user.role !== 'admin' && user.role !== 'teacher') {
            return res.status(403).json({ message: 'Unauthorized! You are not supposed to create exam' });
        }
        const { name, date, center, duration, questions } = req.body;
        const exam = new Exam({ name, date, center, duration, questions });
        await exam.save();
        res.status(201).json(exam);
    } catch (error) {
        res.status(500).json({ message: 'Error creating exam' });
    }
};

export const getExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json(exams);
    } catch (error) {
        res.status(404).json({ message: 'Exams not found' });
    }
};

export const getExam = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        res.status(200).json(exam);
    } catch (error) {
        res.status(404).json({ message: 'Exam not found' });
    }
};

export const updateExam = async (req, res) => {
    const user = req.user;
    try {
        if(user.role !== 'admin' && user.role !== 'teacher') {
            return res.status(403).json({ message: 'Unauthorized! You are not supposed to update exam' });
        }
        const { name, date, center, duration, questions } = req.body;
        const exam = await Exam.findById(req.params.id);
        exam.name = name;
        exam.date = date;
        exam.center = center;
        exam.duration = duration;
        exam.questions = questions;
        await exam.save();
        res.status(200).json(exam);
    } catch (error) {
        res.status(500).json({ message: 'Error updating exam' });
    }
};

export const deleteExam = async (req, res) => {
    const user = req.user;
    try {
        if(user.role !== 'admin' && user.role !== 'teacher') {
            return res.status(403).json({ message: 'Unauthorized! You are not supposed to delete exam' });
        }
        await Exam.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Exam deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting exam' });
    }
};