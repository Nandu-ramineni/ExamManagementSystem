import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { CheckCircle, XCircle, RefreshCw, HelpCircle } from "lucide-react";
import { getExam,  getQuestionsByExam } from "../../services/api";
import {jwtDecode} from "jwt-decode";
import Questions from "./Questions";

export default function ExamView() {
    const { id } = useParams();
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [startInput, setStartInput] = useState("");
    const [examStarted, setExamStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const handle = useFullScreenHandle();
    const [studentId, setStudentId] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            setStudentId(decodedToken.id);
        }
    }, []);

    useEffect(() => {
        handle.enter();
        const fetchExam = async () => {
            try {
                const response = await getExam(id);
                setExam(response.data);
            } catch (err) {
                setError("Exam not found");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchExam();
        return () => handle.exit();
    }, [id, handle]);

    const handleStartExam = async () => {
        if (startInput.toLowerCase() === "start") {
            try {
                const response = await getQuestionsByExam(id);
                setQuestions(response.data);
                setExamStarted(true);
                console.log(response.data);
            } catch (err) {
                setError("Failed to load questions");
                console.error(err);
            }
        } else {
            alert("Please type 'start' to begin the exam.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-red-500 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <h3 className="mt-2 text-xl font-semibold text-gray-900">Error</h3>
                    <p className="mt-1 text-gray-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <FullScreen handle={handle}>
            {examStarted ? (
                <Questions questions={questions} onExamFinish={() => console.log("Exam finished!")} examId={id} studentId={studentId} exam={exam}/>
            ):(
                
                <div className="h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl md:max-w-4xl lg:max-w-6xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-indigo-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-16">
                            <div>
                                <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">{exam.name}</h1>
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="md:w-1/2">
                                        <h2 className="text-2xl font-semibold mb-4">Exam Instructions</h2>
                                        <div className="space-y-4">
                                            <p>1. Total of {exam.duration} minutes will be given to attempt all the questions.</p>
                                            <p>2. The clock has been set at the server and the countdown timer at the top right corner of your screen will display the time remaining for you to complete the exam.</p>
                                            <p>3. The question palette at the right of the screen shows one of the following statuses of each of the questions numbered:</p>
                                            <ul className="space-y-2">
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
                                    <div className="md:w-1/2">
                                        <h2 className="text-2xl font-semibold mb-4">Exam Details</h2>
                                        <div className="space-y-4">
                                            <p><strong>Exam Name:</strong> {exam.name}</p>
                                            <p><strong>Duration:</strong> {exam.duration} minutes</p>
                                            <p><strong>Total Questions:</strong> {exam.questions.length}</p>
                                            <p><strong>Passing Score:</strong> 35%</p>
                                        </div>
                                        <div className="mt-8">
                                            <label htmlFor="startInput" className="block text-sm font-medium text-gray-700 mb-2">
                                                Type {'start'} to begin the exam:
                                            </label>
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    id="startInput"
                                                    value={startInput}
                                                    onChange={(e) => setStartInput(e.target.value)}
                                                    className="shadow-sm border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 block w-3/4 sm:text-sm  rounded-md py-2 px-2"
                                                    placeholder="Type 'start'"
                                                />
                                                <button
                                                    onClick={handleStartExam}
                                                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Start Exam
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            )}
        </FullScreen>
    );
}
