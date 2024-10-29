import { useState, useEffect } from 'react';
import { CheckCircle, ArrowLeft, ArrowRight, XCircle, RefreshCw, HelpCircle } from 'lucide-react';
import { getProfile, submitAnswers } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Questions = ({ questions, examId, studentId, exam }) => {
    const [randomizedQuestions, setRandomizedQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [markedForReview, setMarkedForReview] = useState(Array(questions.length).fill(false)); 
    const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
    const [profile, setProfile] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const response = await getProfile(studentId);
            if (response.status === 200) {
                setProfile(response.data);
            } else {
                console.error("Failed to fetch profile:", response.data.message);
            }
        } catch (error) {
            console.error("Profile fetch error:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        setRandomizedQuestions(shuffledQuestions);
    }, [questions]);

    useEffect(() => {
        if (timeLeft <= 0 && !submitted) {
            handleSubmit();
            setSubmitted(true);
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, submitted]);

    const handleAnswer = (answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentIndex] = answer;
        setAnswers(updatedAnswers);
    };

    const toggleMarkedForReview = () => {
        const updatedMarkedForReview = [...markedForReview];
        updatedMarkedForReview[currentIndex] = !updatedMarkedForReview[currentIndex];
        setMarkedForReview(updatedMarkedForReview);
    };

    const goToQuestion = (index) => {
        setCurrentIndex(index);
    };

    const handleSubmit = async () => {
        const answerSheet = answers.map((answer, index) => ({
            questionId: randomizedQuestions[index]._id,
            answer,
        }));

        try {
            const response = await submitAnswers({
                examId,
                studentId,
                answerSheet,
            });
            if (response.status === 201) {
                navigate('/studentDashboard/results', { state: { score: response.data.score, answerSheet: response.data.answerSheet } });
            } else {
                console.error("Failed to submit answers:", response.data.message);
            }
        } catch (error) {
            console.error("Submission error:", error);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div>
            <div className="flex justify-between items-center px-8 py-4 border-b">
                <h1 className="text-2xl font-bold">Name: {profile.name}</h1>
                <span className="text-lg font-semibold text-red-600">Time Left: {formatTime(timeLeft)}</span>
            </div>
            <div className="flex h-[90vh] bg-gray-100">
                <div className="flex-1 p-6 w-3/4 overflow-y-auto">
                    <div className="bg-white shadow-md rounded-lg p-6 h-1/2">
                        <p className="text-lg mb-6">{randomizedQuestions[currentIndex]?.text}</p>
                        <div className="space-y-2">
                            {randomizedQuestions[currentIndex]?.options.map((option, index) => {
                                const isChecked = Array.isArray(answers[currentIndex])
                                    ? answers[currentIndex].includes(option)
                                    : answers[currentIndex] === option;
                                return (
                                    <div key={index} className="flex items-center space-x-2">
                                        {randomizedQuestions[currentIndex]?.type === 'multi-choice' ? (
                                            <input
                                                type="checkbox"
                                                id={`option-${index}`}
                                                value={option}
                                                checked={isChecked}
                                                onChange={() => {
                                                    const updatedAnswers = [...answers];
                                                    if (Array.isArray(updatedAnswers[currentIndex])) {
                                                        if (isChecked) {
                                                            updatedAnswers[currentIndex] = updatedAnswers[currentIndex].filter((ans) => ans !== option);
                                                        } else {
                                                            updatedAnswers[currentIndex].push(option);
                                                        }
                                                    } else {
                                                        updatedAnswers[currentIndex] = [option];
                                                    }
                                                    setAnswers(updatedAnswers);
                                                }}
                                                className="form-checkbox h-4 w-4 text-blue-500 cursor-pointer"
                                            />
                                        ) : (
                                            <input
                                                type="radio"
                                                id={`option-${index}`}
                                                name="answer"
                                                value={option}
                                                checked={answers[currentIndex] === option}
                                                onChange={() => handleAnswer(option)}
                                                className="form-radio h-4 w-4 text-blue-500 cursor-pointer"
                                            />
                                        )}
                                        <label htmlFor={`option-${index}`} className="text-gray-700">
                                            {option}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={() => goToQuestion(Math.max(currentIndex - 1, 0))}
                            disabled={currentIndex === 0}
                            className="flex items-center px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous
                        </button>
                        {currentIndex === randomizedQuestions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Submit Exam
                            </button>
                        ) : (
                            <button
                                onClick={() => goToQuestion(Math.min(currentIndex + 1, randomizedQuestions.length - 1))}
                                className="flex items-center px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50"
                            >
                                Next
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={toggleMarkedForReview}
                        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                        Mark for Review
                    </button>
                </div>
                <div className="w-1/4 bg-white border-l border-gray-200 p-4">
                    <h2 className="text-lg font-bold mb-4">Question Palette</h2>
                    <div className="grid grid-cols-5 gap-2">
                        {randomizedQuestions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToQuestion(index)}
                                className={`h-8 w-8 p-0 font-medium rounded-full ${
                                    answers[index] !== null
                                        ? 'bg-green-500 text-white'
                                        : markedForReview[index]
                                        ? 'bg-yellow-500 text-white'
                                        : 'bg-red-500 text-white'
                                } ${currentIndex === index ? 'ring-2 ring-blue-300' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <ul className="mt-4">
                        <li className="flex items-center">
                            <CheckCircle className="text-green-500 mr-2" />
                            <span>You have answered the question.</span>
                        </li>
                        <li className="flex items-center">
                            <XCircle className="text-red-500 mr-2" />
                            <span>You have not answered the question.</span>
                        </li>
                        <li className="flex items-center">
                            <RefreshCw className="text-yellow-500 mr-2" />
                            <span>You have answered the question but have marked it for review.</span>
                        </li>
                        <li className="flex items-center">
                            <HelpCircle className="text-gray-500 mr-2" />
                            <span>You have not visited the question yet.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Questions;
