import { useState } from 'react'
import { Calendar, FileText, CheckCircle, } from 'lucide-react'

const assignmentsData = [
    { id: 1, title: 'Math Problem Set', subject: 'Mathematics', dueDate: '2024-11-05', status: 'pending' },
    { id: 2, title: 'History Essay', subject: 'History', dueDate: '2024-11-10', status: 'submitted' },
    { id: 3, title: 'Physics Lab Report', subject: 'Physics', dueDate: '2024-11-15', status: 'graded', grade: 'A-' },
    { id: 4, title: 'Literature Analysis', subject: 'English', dueDate: '2024-11-20', status: 'pending' },
    { id: 5, title: 'Chemistry Experiment', subject: 'Chemistry', dueDate: '2024-11-25', status: 'submitted' },
]

export default function Assignments() {
    const [filter, setFilter] = useState('all')

    const filteredAssignments = assignmentsData.filter(assignment => {
        if (filter === 'all') return true
        return assignment.status === filter
    })

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Assignments</h1>
            <div className="mb-4">
                <label htmlFor="filter" className="mr-2">Filter by status:</label>
                <select
                    id="filter"
                    className="border rounded p-2"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="submitted">Submitted</option>
                    <option value="graded">Graded</option>
                </select>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAssignments.map((assignment) => (
                    <div key={assignment.id} className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">{assignment.title}</h2>
                        <p className="text-sm text-gray-600 mb-2">{assignment.subject}</p>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Due: {assignment.dueDate}</span>
                        </div>
                        <div className="flex items-center">
                            {assignment.status === 'pending' && (
                                <span className="text-yellow-500 flex items-center">
                                    <FileText className="w-4 h-4 mr-1" /> Pending
                                </span>
                            )}
                            {assignment.status === 'submitted' && (
                                <span className="text-blue-500 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-1" /> Submitted
                                </span>
                            )}
                            {assignment.status === 'graded' && (
                                <span className="text-green-500 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-1" /> Graded: {assignment.grade}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}