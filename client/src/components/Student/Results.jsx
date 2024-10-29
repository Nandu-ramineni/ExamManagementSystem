import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const Results = () => {
    const location = useLocation()
    const { score, answerSheet } = location.state || { score: 0, answerSheet: [] }
    const totalScore = answerSheet.reduce((total, item) => total + item.obtainedMarks, 0)
    const [barChartData, setBarChartData] = useState({ labels: [], datasets: [] })
    const [doughnutChartData, setDoughnutChartData] = useState({ labels: [], datasets: [] })

    useEffect(() => {
        const labels = answerSheet.map((item, index) => `Q${index + 1}`)
        const obtainedMarks = answerSheet.map((item) => item.obtainedMarks)
        const maxMarks = answerSheet.map((item) => item.maxMarks || item.obtainedMarks) 

        setBarChartData({
            labels,
            datasets: [
                {
                    label: 'Obtained Marks',
                    data: obtainedMarks,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Max Marks',
                    data: maxMarks,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        })
        setDoughnutChartData({
            labels: ['Correct', 'Incorrect'],
            datasets: [
                {
                    data: [score, totalScore - score],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                    borderWidth: 1,
                },
            ],
        })
    }, [answerSheet, score, totalScore])

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    }

    const barChartOptions = {
        ...chartOptions,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Exam Results</h1>
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <p className="text-2xl font-semibold mb-4 text-center">
                    Your Score: <span className="text-indigo-600">{score}</span>
                    <span className="text-gray-600"></span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="h-64 md:h-80">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Score Distribution</h2>
                        <div className="h-3/4">
                            <Doughnut data={doughnutChartData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="h-64 md:h-80">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Marks per Question</h2>
                        <div className="h-full">
                            <Bar data={barChartData} options={barChartOptions} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <h2 className="text-xl font-semibold p-4 bg-gray-50 border-b text-gray-800">Detailed Answer Sheet</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Question ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Your Answer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Obtained Marks
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {answerSheet.map((item, index) => (
                                <tr key={item._id || index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.questionId || `Q${index + 1}`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {Array.isArray(item.answer) ? item.answer.join(', ') : item.answer}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.obtainedMarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Results