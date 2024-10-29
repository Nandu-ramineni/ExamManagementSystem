
import { useState } from "react"
import { useParams } from "react-router-dom"
import { addQuestion } from "../../services/api"
import { PlusCircle, MinusCircle, Check, X } from "lucide-react"

const AddQuestions = () => {
    const { examId } = useParams()
    const [type, setType] = useState("objective")
    const [text, setText] = useState("")
    const [options, setOptions] = useState(["", "", "", ""])
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [marks, setMarks] = useState(1)
    const [negativeMarks, setNegativeMarks] = useState(0)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options]
        updatedOptions[index] = value
        setOptions(updatedOptions)
    }

    const handleCorrectAnswerChange = (answer) => {
        if (type === "multi-choice") {
            setCorrectAnswers(prev =>
                prev.includes(answer) ? prev.filter(ans => ans !== answer) : [...prev, answer]
            )
        } else {
            setCorrectAnswers([answer])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const questionData = {
            examId,
            type,
            text,
            options,
            correctAnswers,
            marks,
            negativeMarks,
        }

        try {
            const response = await addQuestion(questionData)
            if (response.status === 201) {
                setSuccess("Question added successfully.")
                setError("")
                setType("objective")
                setText("")
                setOptions(["", "", "", ""])
                setCorrectAnswers([])
                setMarks(1)
                setNegativeMarks(0)
            } else {
                setError("Failed to add question. Please try again.")
                setSuccess("")
            }
        } catch (err) {
            setError("Failed to add question. Please try again.")
            setSuccess("")
            console.error(err)
        }
    }

    const addOption = () => {
        setOptions([...options, ""])
    }

    const removeOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index)
        setOptions(newOptions)
        setCorrectAnswers(correctAnswers.filter(answer => newOptions.includes(answer)))
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Question</h2>
            {success && (
                <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
                    <p className="flex items-center">
                        <Check className="mr-2" />
                        {success}
                    </p>
                </div>
            )}
            {error && (
                <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p className="flex items-center">
                        <X className="mr-2" />
                        {error}
                    </p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="objective">Objective</option>
                                <option value="single-choice">Single Choice</option>
                                <option value="multi-choice">Multiple Choice</option>
                                <option value="subjective">Subjective</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                rows={4}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Marks</label>
                                <input
                                    type="number"
                                    value={marks}
                                    onChange={(e) => setMarks(parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Negative Marks</label>
                                <input
                                    type="number"
                                    value={negativeMarks}
                                    onChange={(e) => setNegativeMarks(parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {(type === "objective" || type === "single-choice" || type === "multi-choice") && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
                                    <div className="space-y-2">
                                        {options.map((option, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                                    placeholder={`Option ${index + 1}`}
                                                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeOption(index)}
                                                    className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                                                >
                                                    <MinusCircle className="h-5 w-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addOption}
                                        className="mt-2 flex items-center text-indigo-600 hover:text-indigo-800"
                                    >
                                        <PlusCircle className="h-5 w-5 mr-1" />
                                        Add Option
                                    </button>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer(s)</label>
                                    <div className="space-y-2">
                                        {options.map((option, index) => (
                                            <div key={index} className="flex items-center">
                                                <input
                                                    type={type === "multi-choice" ? "checkbox" : "radio"}
                                                    name="correctAnswer"
                                                    value={option}
                                                    checked={correctAnswers.includes(option)}
                                                    onChange={() => handleCorrectAnswerChange(option)}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                                <label className="ml-2 block text-sm text-gray-900">{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105"
                >
                    Add Question
                </button>
            </form>
        </div>
    )
}

export default AddQuestions