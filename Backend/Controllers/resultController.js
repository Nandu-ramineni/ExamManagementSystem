import Question from "../Models/Question.js";
import Result from "../Models/Result.js";

export const publishResult = async (req, res) => {
    try {
        const { examId, studentId, answerSheet } = req.body;
        let totalScore = 0;
        const detailedAnswers = await Promise.all(
            answerSheet.map(async (answer) => {
                const question = await Question.findById(answer.questionId);
                let obtainedMarks = 0;

                if (question.type === 'multi-choice' && Array.isArray(answer.answer)) {
                    const correctAnswers = question.correctAnswers;
                    const isCorrect =
                        answer.answer.every((ans) => correctAnswers.includes(ans)) &&
                        answer.answer.length === correctAnswers.length;
                    obtainedMarks = isCorrect ? question.marks : question.negativeMarks || 0;
                } else if (question.type === 'single-choice' || question.type === 'objective') {
                    obtainedMarks = question.correctAnswers.includes(answer.answer)
                        ? question.marks
                        : question.negativeMarks || 0;
                }
            
                totalScore += obtainedMarks;

                return {
                    questionId: question._id,
                    answer: answer.answer,
                    obtainedMarks,
                };
            })
        );

        const result = new Result({
            examId,
            studentId,
            score: totalScore,
            answerSheet: detailedAnswers,
        });

        await result.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error publishing result',error:error.message });
    }
};

export const getResultsByExam = async (req, res) => {
    try {
        const { examId } = req.params;
        const results = await Result.find({ examId });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching results',error:error.message });
    }
};

export const getResultByStudent = async (req, res) => {
    try {
        const { examId, studentId } = req.params;
        const result = await Result.findOne({ examId, studentId });
        
        if (!result) {
            return res.status(404).json({ message: 'Result not found for the specified student and exam.' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching result', error: error.message });
    }
};




