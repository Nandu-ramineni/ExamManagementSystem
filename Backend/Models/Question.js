import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    type: { type: String, enum: ['objective', 'single-choice', 'multi-choice', 'subjective'], required: true },
    text: { type: String, required: true },
    options: [String],
    correctAnswers: [String],
    marks: { type: Number, required: true },
    negativeMarks: { type: Number },
})

const Question = mongoose.model('Question', questionSchema);
export default Question;