import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    score: { type: Number, required: true },
    answerSheet: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
            answer: { type: mongoose.Schema.Types.Mixed },
            obtainedMarks: { type: Number, required: true },
        },
    ],
});

const Result = mongoose.model('Result', resultSchema);
export default Result;
