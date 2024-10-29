import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    center: { type: String },
    duration: { type: Number },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
})

const Exam = mongoose.model('Exam', examSchema);
export default Exam; 